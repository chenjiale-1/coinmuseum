from __future__ import annotations

import datetime
import hashlib
import hmac
import json
import os
import sqlite3
import urllib.error
import urllib.request
import threading
import time
from collections import OrderedDict
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory, session

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("DB_PATH", BASE_DIR / "data" / "coin_museum.db"))

app = Flask(__name__, static_folder=".", static_url_path="")
app.secret_key = os.environ.get("SECRET_KEY", "coin-museum-secret-key-2026")

DEFAULT_ACCOUNTS = {
    "admin": "admin123",
    "museum": "museum123",
}

DEFAULT_COIN_TYPES = [
    {"id": "wuzhu", "name": "五铢"},
    {"id": "kaiyuan-tongbao", "name": "开元通宝"},
    {"id": "kangxi-tongbao", "name": "康熙通宝"},
    {"id": "qingyuan-tongbao", "name": "庆元通宝"},
    {"id": "hongwu-tongbao", "name": "洪武通宝"},
]

DEFAULT_REGIMES = [
    {"id": "han", "name": "西汉", "alias": "汉", "start_year": -202, "end_year": 8, "capital": "长安"},
    {"id": "tang", "name": "唐", "alias": "大唐", "start_year": 618, "end_year": 907, "capital": "长安"},
    {"id": "song", "name": "北宋", "alias": "宋", "start_year": 960, "end_year": 1127, "capital": "开封"},
    {"id": "yuan", "name": "元", "alias": "元朝", "start_year": 1271, "end_year": 1368, "capital": "大都"},
    {"id": "ming", "name": "明", "alias": "明朝", "start_year": 1368, "end_year": 1644, "capital": "南京/北京"},
    {"id": "qing", "name": "清", "alias": "清朝", "start_year": 1636, "end_year": 1912, "capital": "北京"},
]

DEFAULT_MINTS = [
    {"id": "chang'an-mint", "name": "长安钱监", "active_start": -200, "active_end": 220, "regime_id": "han"},
    {"id": "luoyang-mint", "name": "洛阳钱监", "active_start": 618, "active_end": 907, "regime_id": "tang"},
    {"id": "kaifeng-mint", "name": "开封钱监", "active_start": 960, "active_end": 1127, "regime_id": "song"},
    {"id": "dadu-mint", "name": "大都宝泉局", "active_start": 1271, "active_end": 1368, "regime_id": "yuan"},
    {"id": "nanjing-mint", "name": "南京宝源局", "active_start": 1368, "active_end": 1421, "regime_id": "ming"},
    {"id": "beijing-mint", "name": "北京宝泉局", "active_start": 1644, "active_end": 1912, "regime_id": "qing"},
]

DEFAULT_ERAS = [
    {"id": "wuzhu", "name": "五铢", "start_year": -118, "end_year": 621},
    {"id": "kaiyuan", "name": "开元", "start_year": 713, "end_year": 741},
    {"id": "tianxi", "name": "天禧", "start_year": 1017, "end_year": 1021},
    {"id": "qingyuan", "name": "庆元", "start_year": 1195, "end_year": 1200},
    {"id": "hongwu", "name": "洪武", "start_year": 1368, "end_year": 1398},
    {"id": "kangxi", "name": "康熙", "start_year": 1662, "end_year": 1722},
]

DEFAULT_REGIONS = [
    {"id": "shaanxi", "name": "陕西", "historical_name": "京兆/雍州", "coordinates": "34.26,108.95", "source_ref": "《中国历史地图集》"},
    {"id": "henan", "name": "河南", "historical_name": "司隶/豫州", "coordinates": "34.75,113.63", "source_ref": "《中国历史地图集》"},
    {"id": "beijing", "name": "北京", "historical_name": "幽州/燕京", "coordinates": "39.90,116.41", "source_ref": "《中国历史地图集》"},
    {"id": "shanxi", "name": "山西", "historical_name": "并州/河东", "coordinates": "37.87,112.55", "source_ref": "《中国历史地图集》"},
    {"id": "jiangnan", "name": "江南", "historical_name": "江南东路/两浙", "coordinates": "31.30,120.62", "source_ref": "《中国历史地图集》"},
    {"id": "fujian", "name": "福建", "historical_name": "闽/福州", "coordinates": "26.10,119.30", "source_ref": "《中国历史地图集》"},
    {"id": "sichuan", "name": "四川", "historical_name": "益州/成都府", "coordinates": "30.66,104.06", "source_ref": "《中国历史地图集》"},
    {"id": "nanjing", "name": "南京", "historical_name": "江宁/建康", "coordinates": "32.06,118.78", "source_ref": "《中国历史地图集》"},
    {"id": "hangzhou", "name": "杭州", "historical_name": "临安/钱塘", "coordinates": "30.27,120.15", "source_ref": "《中国历史地图集》"},
]

DEFAULT_MATERIALS = [
    {"id": "bronze", "name": "青铜"},
    {"id": "brass", "name": "黄铜"},
    {"id": "iron", "name": "铁"},
    {"id": "lead", "name": "铅"},
    {"id": "silver", "name": "银"},
    {"id": "gold", "name": "金"},
    {"id": "paper", "name": "纸"},
]

DEFAULT_SHAPES = [
    {"id": "square-hole", "name": "方孔圆钱"},
    {"id": "spade", "name": "尖足布"},
    {"id": "knife", "name": "刀币"},
    {"id": "sycee", "name": "元宝形银锭"},
]

DEFAULT_SCRIPTS = [
    {"id": "regular", "name": "楷书"},
    {"id": "seal", "name": "篆书"},
    {"id": "running", "name": "行书"},
    {"id": "clerical", "name": "隶书"},
]

DEFAULT_SOURCE_REFS = [
    {"id": "dic-song", "name": "《中国钱币大辞典·北宋篇》"},
    {"id": "cnm-db", "name": "中国钱币博物馆藏品数据库"},
    {"id": "nmc-open", "name": "中国国家博物馆公开资料"},
]

DEFAULT_COINS = []
LEGACY_DEFAULT_COINS = [
    {
        "id": "han-wuzhu",
        "name": "汉代五铢",
        "type": "小平钱",
        "era": "西汉",
        "material": "铜",
        "shape": "方孔圆钱",
        "script": "楷书",
        "region": "陕西",
        "year": "西汉中期",
        "weight": "3.7 g",
        "diameter": "2.5 cm",
        "holeWidth": "0.7 cm",
        "thickness": "0.3 cm",
        "inscription": "五铢",
        "description": "钱文规整，纹饰清晰，体现西汉时期成熟的铸造技术与稳定的币制规模。",
        "short": "钱文规整，纹饰清晰，体现西汉中期成熟铸造技术。",
        "sourceRef": "《中国钱币大辞典·北宋篇》/西汉版式记录",
        "tags": ["西汉", "铜币", "货币", "方孔圆钱", "楷书"],
        "image": "https://images.unsplash.com/photo-1616628182507-8f00b7d9d474?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": "tang-kaiyuan",
        "name": "唐代开元通宝",
        "type": "开元通宝",
        "era": "唐",
        "material": "铜",
        "shape": "方孔圆钱",
        "script": "楷书",
        "region": "河南",
        "year": "开元年间",
        "weight": "2.8 g",
        "diameter": "2.4 cm",
        "holeWidth": "0.6 cm",
        "thickness": "0.28 cm",
        "inscription": "开元通宝",
        "description": "刻文工整、形制统一，是唐代货币制度稳定与流通规模扩大的典型代表。",
        "short": "币制标准化明显，反映唐代稳定的货币流通体系。",
        "sourceRef": "中国钱币博物馆藏品数据库/唐代典型版式",
        "tags": ["唐", "铜币", "货币", "方孔圆钱", "楷书"],
        "image": "https://images.unsplash.com/photo-1572981779307-38b8cabb24e8?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": "qing-kangxi",
        "name": "清代康熙通宝",
        "type": "康熙通宝",
        "era": "清",
        "material": "铜",
        "shape": "方孔圆钱",
        "script": "楷书",
        "region": "北京",
        "year": "康熙年间",
        "weight": "3.1 g",
        "diameter": "2.6 cm",
        "holeWidth": "0.7 cm",
        "thickness": "0.31 cm",
        "inscription": "康熙通宝",
        "description": "铸造精整，表面纹理干净，兼具历史传播价值与收藏研究意义。",
        "short": "铸造精整，具备历史传播价值与收藏研究意义。",
        "sourceRef": "中国国家博物馆公开资料/清代钱币版式",
        "tags": ["清", "收藏", "铜币", "方孔圆钱", "楷书"],
        "image": "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": "song-qingyuan",
        "name": "宋代庆元通宝",
        "type": "庆元通宝",
        "era": "宋",
        "material": "铜",
        "shape": "小平钱",
        "script": "楷书",
        "region": "江南",
        "year": "北宋后期",
        "weight": "2.9 g",
        "diameter": "2.3 cm",
        "holeWidth": "0.6 cm",
        "thickness": "0.22 cm",
        "inscription": "庆元通宝",
        "description": "边缘较薄，字样清楚，说明宋代货币制造工艺已经相当成熟。",
        "short": "字样清楚，反映宋代造币技术的成熟水平。",
        "sourceRef": "中国钱币博物馆藏品标识/宋代钱币版式",
        "tags": ["宋", "铜币", "收藏", "小平钱", "楷书"],
        "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    },
    {
        "id": "ming-hongwu",
        "name": "明代洪武通宝",
        "type": "洪武通宝",
        "era": "明",
        "material": "铜",
        "shape": "方孔圆钱",
        "script": "篆书",
        "region": "南京",
        "year": "洪武年间",
        "weight": "3.5 g",
        "diameter": "2.7 cm",
        "holeWidth": "0.7 cm",
        "thickness": "0.28 cm",
        "inscription": "洪武通宝",
        "description": "钱文较为浑朴，体现明初币制恢复与国家铸币体系重建。",
        "short": "浑朴有力，见证明初币制重建。",
        "sourceRef": "中国钱币博物馆/明代钱币条目",
        "tags": ["明", "铜币", "收藏", "篆书"],
        "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
    }
]


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with get_db_connection() as conn:
        # Coin instances with ontology-aligned fields.
        # Existing fields are preserved; new columns include normalized
        # measurement fields, image source and explicit source_ref.
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS coins (
                id TEXT PRIMARY KEY,
                name TEXT,
                type TEXT,
                era TEXT,
                material TEXT,
                shape TEXT,
                script TEXT,
                region TEXT,
                year TEXT,
                weight TEXT,
                diameter TEXT,
                holeWidth TEXT,
                thickness TEXT,
                diameter_cm TEXT,
                hole_width_cm TEXT,
                rim_thickness_cm TEXT,
                weight_g TEXT,
                inscription TEXT,
                description TEXT,
                short TEXT,
                sourceRef TEXT,
                source_ref TEXT,
                image_source TEXT,
                tags TEXT,
                image TEXT,
                coin_type_id TEXT,
                regime_id TEXT,
                mint_id TEXT,
                era_id TEXT,
                material_id TEXT,
                shape_id TEXT,
                script_id TEXT
            )
            """
        )

        # Preserve the richer fields supplied by the source Excel workbook.
        # Existing databases are migrated in place; fresh databases receive the
        # same columns through this idempotent migration.
        extended_coin_columns = {
            "alias": "TEXT",
            "classification_basis": "TEXT",
            "length_cm": "TEXT",
            "width_cm": "TEXT",
            "excavation_site": "TEXT",
            "mint_name": "TEXT",
            "person_name": "TEXT",
            "historical_event": "TEXT",
            "timelineYear": "INTEGER",
        }
        existing_coin_columns = {
            row[1] for row in conn.execute("PRAGMA table_info(coins)").fetchall()
        }
        for column_name, column_type in extended_coin_columns.items():
            if column_name not in existing_coin_columns:
                conn.execute(f"ALTER TABLE coins ADD COLUMN {column_name} {column_type}")

        # Ontology entity tables
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS coin_types (
                id TEXT PRIMARY KEY,
                name TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS regimes (
                id TEXT PRIMARY KEY,
                name TEXT,
                alias TEXT,
                start_year INTEGER,
                end_year INTEGER,
                capital TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS mints (
                id TEXT PRIMARY KEY,
                name TEXT,
                active_start INTEGER,
                active_end INTEGER,
                regime_id TEXT,
                region_id TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS persons (
                id TEXT PRIMARY KEY,
                name TEXT,
                office TEXT,
                birth INTEGER,
                die INTEGER,
                achievement TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS eras (
                id TEXT PRIMARY KEY,
                name TEXT,
                start_year INTEGER,
                end_year INTEGER
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS regions (
                id TEXT PRIMARY KEY,
                name TEXT,
                historical_name TEXT,
                coordinates TEXT,
                source_ref TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS routes (
                id TEXT PRIMARY KEY,
                name TEXT,
                description TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS areas (
                id TEXT PRIMARY KEY,
                name TEXT,
                description TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS materials (
                id TEXT PRIMARY KEY,
                name TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS shapes (
                id TEXT PRIMARY KEY,
                name TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS scripts (
                id TEXT PRIMARY KEY,
                name TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS source_refs (
                id TEXT PRIMARY KEY,
                name TEXT
            )
            """
        )

        # Relationship tables for the ontology
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS relationships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                subject_type TEXT,
                subject_id TEXT,
                predicate TEXT,
                object_type TEXT,
                object_id TEXT,
                remark TEXT
            )
            """
        )

        _seed_ontology_data(conn)

        existing = conn.execute("SELECT COUNT(*) FROM coins").fetchone()[0]
        if existing == 0:
            for coin in DEFAULT_COINS:
                insert_coin(conn, coin)


def _seed_ontology_data(conn):
    """Seed default ontology entities if tables are empty."""
    for ct in DEFAULT_COIN_TYPES:
        conn.execute(
            "INSERT OR IGNORE INTO coin_types (id, name) VALUES (?, ?)",
            (ct["id"], ct["name"]),
        )
    for r in DEFAULT_REGIMES:
        conn.execute(
            """
            INSERT OR IGNORE INTO regimes (id, name, alias, start_year, end_year, capital)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (r["id"], r["name"], r["alias"], r["start_year"], r["end_year"], r["capital"]),
        )
    for m in DEFAULT_MINTS:
        conn.execute(
            """
            INSERT OR IGNORE INTO mints (id, name, active_start, active_end, regime_id, region_id)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (m["id"], m["name"], m["active_start"], m["active_end"], m["regime_id"], m.get("region_id")),
        )
    for e in DEFAULT_ERAS:
        conn.execute(
            """
            INSERT OR IGNORE INTO eras (id, name, start_year, end_year)
            VALUES (?, ?, ?, ?)
            """,
            (e["id"], e["name"], e["start_year"], e["end_year"]),
        )
    for r in DEFAULT_REGIONS:
        conn.execute(
            """
            INSERT OR IGNORE INTO regions (id, name, historical_name, coordinates, source_ref)
            VALUES (?, ?, ?, ?, ?)
            """,
            (r["id"], r["name"], r["historical_name"], r["coordinates"], r["source_ref"]),
        )
    for m in DEFAULT_MATERIALS:
        conn.execute(
            "INSERT OR IGNORE INTO materials (id, name) VALUES (?, ?)",
            (m["id"], m["name"]),
        )
    for s in DEFAULT_SHAPES:
        conn.execute(
            "INSERT OR IGNORE INTO shapes (id, name) VALUES (?, ?)",
            (s["id"], s["name"]),
        )
    for s in DEFAULT_SCRIPTS:
        conn.execute(
            "INSERT OR IGNORE INTO scripts (id, name) VALUES (?, ?)",
            (s["id"], s["name"]),
        )
    for sr in DEFAULT_SOURCE_REFS:
        conn.execute(
            "INSERT OR IGNORE INTO source_refs (id, name) VALUES (?, ?)",
            (sr["id"], sr["name"]),
        )


def insert_coin(conn, coin):
    tags = json.dumps(coin.get("tags", []), ensure_ascii=False)
    conn.execute(
        """
        INSERT INTO coins (
            id, name, type, era, material, shape, script, region, year, weight, diameter,
            holeWidth, thickness, diameter_cm, hole_width_cm, rim_thickness_cm, weight_g,
            inscription, description, short, sourceRef, source_ref, image_source, tags, image,
            coin_type_id, regime_id, mint_id, era_id, material_id, shape_id, script_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            name=excluded.name,
            type=excluded.type,
            era=excluded.era,
            material=excluded.material,
            shape=excluded.shape,
            script=excluded.script,
            region=excluded.region,
            year=excluded.year,
            weight=excluded.weight,
            diameter=excluded.diameter,
            holeWidth=excluded.holeWidth,
            thickness=excluded.thickness,
            diameter_cm=excluded.diameter_cm,
            hole_width_cm=excluded.hole_width_cm,
            rim_thickness_cm=excluded.rim_thickness_cm,
            weight_g=excluded.weight_g,
            inscription=excluded.inscription,
            description=excluded.description,
            short=excluded.short,
            sourceRef=excluded.sourceRef,
            source_ref=excluded.source_ref,
            image_source=excluded.image_source,
            tags=excluded.tags,
            image=excluded.image,
            coin_type_id=excluded.coin_type_id,
            regime_id=excluded.regime_id,
            mint_id=excluded.mint_id,
            era_id=excluded.era_id,
            material_id=excluded.material_id,
            shape_id=excluded.shape_id,
            script_id=excluded.script_id
        """,
        (
            coin.get("id"),
            coin.get("name"),
            coin.get("type"),
            coin.get("era"),
            coin.get("material"),
            coin.get("shape"),
            coin.get("script"),
            coin.get("region"),
            coin.get("year"),
            coin.get("weight"),
            coin.get("diameter"),
            coin.get("holeWidth"),
            coin.get("thickness"),
            coin.get("diameter_cm"),
            coin.get("hole_width_cm"),
            coin.get("rim_thickness_cm"),
            coin.get("weight_g"),
            coin.get("inscription"),
            coin.get("description"),
            coin.get("short"),
            coin.get("sourceRef"),
            coin.get("source_ref"),
            coin.get("image_source"),
            tags,
            coin.get("image"),
            coin.get("coin_type_id"),
            coin.get("regime_id"),
            coin.get("mint_id"),
            coin.get("era_id"),
            coin.get("material_id"),
            coin.get("shape_id"),
            coin.get("script_id"),
        ),
    )


# 火山引擎机器翻译服务凭证：一律从环境变量读取，禁止在源码中写入密钥。
# 本地开发可在启动前设置 VOLCENGINE_AK / VOLCENGINE_SK，未设置时翻译接口将返回空结果并自动降级为本地词典。
VOLCENGINE_AK = os.getenv("VOLCENGINE_AK", "")
VOLCENGINE_SK = os.getenv("VOLCENGINE_SK", "")

TRANSLATE_HOST = os.getenv("VOLCENGINE_TRANSLATE_HOST", "translate.volcengineapi.com")
TRANSLATE_REGION = os.getenv("VOLCENGINE_TRANSLATE_REGION", "cn-north-1")
TRANSLATE_SERVICE = "translate"
TRANSLATE_ACTION = "TranslateText"
TRANSLATE_VERSION = "2020-06-01"
TRANSLATE_MAX_TEXTS_PER_REQUEST = 16
TRANSLATE_MAX_CHARS_PER_REQUEST = 4500
TRANSLATE_CACHE_LIMIT = 8000
TRANSLATE_MAX_RETRIES = 3
TRANSLATE_MAX_CONCURRENT_CHUNKS = 4
TRANSLATE_CACHE_LOCK = threading.RLock()
TRANSLATE_CACHE: "OrderedDict[tuple[str, str], str]" = OrderedDict()


def _sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _hmac_sha256(key: bytes, message: str) -> bytes:
    return hmac.new(key, message.encode("utf-8"), hashlib.sha256).digest()


def _volcengine_signed_headers(method, path, query, body, host, region, service):
    now = datetime.datetime.now(datetime.timezone.utc)
    datestamp = now.strftime("%Y%m%d")
    x_date = now.strftime("%Y%m%dT%H%M%SZ")

    canonical_headers = (
        "content-type:application/json\n"
        f"host:{host}\n"
        f"x-date:{x_date}\n"
    )
    signed_headers = "content-type;host;x-date"
    canonical_request = "\n".join([
        method,
        path,
        query,
        canonical_headers,
        signed_headers,
        _sha256_hex(body),
    ])

    credential_scope = f"{datestamp}/{region}/{service}/request"
    string_to_sign = "\n".join([
        "HMAC-SHA256",
        x_date,
        credential_scope,
        _sha256_hex(canonical_request.encode("utf-8")),
    ])

    signing_key = _hmac_sha256(
        _hmac_sha256(_hmac_sha256(_hmac_sha256(
            VOLCENGINE_SK.encode("utf-8"), datestamp), region), service),
        "request",
    )
    signature = hmac.new(signing_key, string_to_sign.encode("utf-8"), hashlib.sha256).hexdigest()

    return {
        "Content-Type": "application/json",
        "Host": host,
        "X-Date": x_date,
        "Authorization": (
            f"HMAC-SHA256 Credential={VOLCENGINE_AK}/{credential_scope}, "
            f"SignedHeaders={signed_headers}, Signature={signature}"
        ),
    }


def translate_texts_chunk(texts, target_lang):
    """调用火山引擎机器翻译 TranslateText 接口翻译一批文本（单批不超过 16 条）。"""
    body = json.dumps(
        {"TargetLanguage": target_lang, "TextList": texts},
        ensure_ascii=False,
    ).encode("utf-8")
    query = f"Action={TRANSLATE_ACTION}&Version={TRANSLATE_VERSION}"
    headers = _volcengine_signed_headers(
        "POST", "/", query, body, TRANSLATE_HOST, TRANSLATE_REGION, TRANSLATE_SERVICE
    )
    request_obj = urllib.request.Request(
        f"https://{TRANSLATE_HOST}/?{query}", data=body, headers=headers, method="POST"
    )

    for attempt in range(TRANSLATE_MAX_RETRIES):
        try:
            with urllib.request.urlopen(request_obj, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))
        except (urllib.error.URLError, ValueError, OSError):
            payload = None

        metadata = (payload or {}).get("ResponseMetadata") or {}
        if payload and not metadata.get("Error"):
            translations = payload.get("TranslationList") or []
            translated = [str(item.get("Translation") or "").strip() for item in translations]
            if len(translated) == len(texts) and all(translated):
                return translated
            break

        # 限流和服务端 5xx 是短暂错误，短暂退避后重试；参数/鉴权错误重试无意义。
        error_code = str((metadata.get("Error") or {}).get("Code") or "")
        if error_code.startswith("-4") and error_code != "-429":
            break
        if attempt + 1 < TRANSLATE_MAX_RETRIES:
            time.sleep(0.35 * (attempt + 1))

    return []


def _translation_cache_key(text: str, target_lang: str) -> tuple[str, str]:
    return f"{hashlib.sha256(text.encode('utf-8')).hexdigest()}:{target_lang}", text


def _translation_cache_get_many(texts, target_lang):
    with TRANSLATE_CACHE_LOCK:
        hits: dict[str, str] = {}
        for text in texts:
            key, source = _translation_cache_key(text, target_lang)
            value = TRANSLATE_CACHE.get(key)
            if value is not None:
                TRANSLATE_CACHE.move_to_end(key)
                hits[source] = value
        return hits


def _translation_cache_put_many(values: dict[str, str], target_lang: str):
    with TRANSLATE_CACHE_LOCK:
        for text, translated in values.items():
            key, _ = _translation_cache_key(text, target_lang)
            TRANSLATE_CACHE[key] = translated
            TRANSLATE_CACHE.move_to_end(key)
        while len(TRANSLATE_CACHE) > TRANSLATE_CACHE_LIMIT:
            TRANSLATE_CACHE.popitem(last=False)


def call_volcengine_translate(texts, target_lang):
    """去重、分批并并发调用火山翻译；未命中的缺失项保留为空串，便于前端局部回退。"""
    if not texts or not VOLCENGINE_AK or not VOLCENGINE_SK:
        return []

    original_texts = [str(text) for text in texts]
    unique_texts = list(dict.fromkeys(item for item in original_texts if item.strip()))
    cached = _translation_cache_get_many(unique_texts, target_lang)
    pending = [text for text in unique_texts if text not in cached]

    chunks: list[list[str]] = []
    chunk: list[str] = []
    chunk_chars = 0
    for text in pending:
        exceeds_count = len(chunk) >= TRANSLATE_MAX_TEXTS_PER_REQUEST
        exceeds_chars = chunk and chunk_chars + len(text) > TRANSLATE_MAX_CHARS_PER_REQUEST
        if exceeds_count or exceeds_chars:
            chunks.append(chunk)
            chunk, chunk_chars = [], 0
        chunk.append(text)
        chunk_chars += len(text)
    if chunk:
        chunks.append(chunk)

    if chunks:
        fetched: dict[str, str] = {}
        worker_count = min(TRANSLATE_MAX_CONCURRENT_CHUNKS, len(chunks))
        with ThreadPoolExecutor(max_workers=worker_count, thread_name_prefix="volc-mt") as executor:
            futures = {executor.submit(translate_texts_chunk, item, target_lang): item for item in chunks}
            for future in as_completed(futures):
                source_chunk = futures[future]
                translated_chunk = future.result()
                for source, translated in zip(source_chunk, translated_chunk):
                    if translated:
                        fetched[source] = translated
        if fetched:
            _translation_cache_put_many(fetched, target_lang)
            cached.update(fetched)

    results = []
    for text in original_texts:
        if not text.strip():
            results.append(text)
        else:
            results.append(cached.get(text, ""))
    return results


@app.post("/api/translate")
def translate_texts():
    payload = request.get_json(silent=True) or {}
    texts = payload.get("texts") or []
    target = str(payload.get("target") or "en").strip().lower()

    if not isinstance(texts, list) or not texts:
        return jsonify({"error": "texts must be a non-empty list"}), 400

    translated = call_volcengine_translate(texts, target)
    failed_count = sum(1 for item in translated if item == "")
    if translated and failed_count < len(translated):
        return jsonify({
            "data": translated,
            "provider": "volcengine",
            "failedCount": failed_count,
            "fallback": failed_count == len(translated),
        })

    return jsonify({"data": [], "provider": "volcengine", "failedCount": len(texts), "fallback": True})


@app.get("/api/session")
def get_session():
    username = session.get("username")
    role = session.get("role", "guest")

    return jsonify({
        "loggedIn": bool(username),
        "username": username or "游客",
        "role": role,
    })


@app.post("/api/login")
def login():
    payload = request.get_json(silent=True) or {}
    mode = str(payload.get("mode") or "account").strip().lower()
    username = str(payload.get("username") or "").strip()
    password = str(payload.get("password") or "")

    if mode == "guest":
        session["username"] = "游客"
        session["role"] = "guest"
        return jsonify({"ok": True, "username": "游客", "role": "guest"})

    if not username or not password:
        return jsonify({"ok": False, "message": "账号和密码不能为空"}), 400

    valid_password = DEFAULT_ACCOUNTS.get(username)
    if valid_password != password:
        return jsonify({"ok": False, "message": "账号或密码错误"}), 401

    session["username"] = username
    session["role"] = "account"
    return jsonify({"ok": True, "username": username, "role": "account"})


@app.post("/api/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "database": str(DB_PATH)})


@app.get("/api/stats")
def get_stats():
    with get_db_connection() as conn:
        rows = conn.execute("SELECT * FROM coins").fetchall()
    coins = [dict(row) for row in rows]
    for coin in coins:
        coin["tags"] = json.loads(coin.get("tags") or "[]")

    specimens = len(coins)
    coin_types = len({coin.get("type", "").strip() for coin in coins if coin.get("type")})
    mint_regions = len({coin.get("region", "").strip() for coin in coins if coin.get("region")})
    materials = len({coin.get("material", "").strip() for coin in coins if coin.get("material")})

    return jsonify({
        "specimens": specimens,
        "coinTypes": coin_types,
        "mintRegions": mint_regions,
        "materials": materials,
    })


@app.get("/api/coins")
def get_coins():
    with get_db_connection() as conn:
        rows = conn.execute("SELECT * FROM coins ORDER BY rowid DESC").fetchall()

    coins = []
    for row in rows:
        coin = dict(row)
        coin["tags"] = json.loads(coin.get("tags") or "[]")
        coins.append(coin)
    return jsonify(coins)


@app.delete("/api/coins/<coin_id>")
def delete_coin(coin_id):
    if not coin_id:
        return jsonify({"error": "coin_id is required"}), 400

    with get_db_connection() as conn:
        cursor = conn.execute("DELETE FROM coins WHERE id = ?", (coin_id,))
        deleted = cursor.rowcount > 0

    if not deleted:
        return jsonify({"error": "coin not found"}), 404

    return jsonify({"ok": True, "id": coin_id})


@app.post("/api/coins")
def add_coin():
    payload = request.get_json(silent=True) or {}
    if not payload.get("name"):
        return jsonify({"error": "name is required"}), 400

    with get_db_connection() as conn:
        insert_coin(conn, payload)
    return jsonify({"ok": True})


@app.post("/api/coins/bulk")
def save_bulk_coins():
    payload = request.get_json(silent=True) or {}
    coins = payload.get("coins") or []
    if not isinstance(coins, list):
        return jsonify({"error": "coins must be list"}), 400

    with get_db_connection() as conn:
        for coin in coins:
            if coin.get("id"):
                insert_coin(conn, coin)
    return jsonify({"ok": True, "count": len(coins)})


def _rows_to_list(rows):
    return [dict(row) for row in rows]


@app.get("/api/ontology")
def get_ontology():
    """Return the full ontology: entities, relations and sample data."""
    with get_db_connection() as conn:
        entities = {
            "coin_types": _rows_to_list(conn.execute("SELECT * FROM coin_types").fetchall()),
            "regimes": _rows_to_list(conn.execute("SELECT * FROM regimes").fetchall()),
            "mints": _rows_to_list(conn.execute("SELECT * FROM mints").fetchall()),
            "persons": _rows_to_list(conn.execute("SELECT * FROM persons").fetchall()),
            "eras": _rows_to_list(conn.execute("SELECT * FROM eras").fetchall()),
            "regions": _rows_to_list(conn.execute("SELECT * FROM regions").fetchall()),
            "routes": _rows_to_list(conn.execute("SELECT * FROM routes").fetchall()),
            "areas": _rows_to_list(conn.execute("SELECT * FROM areas").fetchall()),
            "materials": _rows_to_list(conn.execute("SELECT * FROM materials").fetchall()),
            "shapes": _rows_to_list(conn.execute("SELECT * FROM shapes").fetchall()),
            "scripts": _rows_to_list(conn.execute("SELECT * FROM scripts").fetchall()),
            "source_refs": _rows_to_list(conn.execute("SELECT * FROM source_refs").fetchall()),
        }

    relations = [
        {"id": "issuedBy", "domain": "coin", "range": "Regime", "description": "钱币由某政权发行"},
        {"id": "mintedAt", "domain": "coin", "range": "Mint", "description": "钱币由某机构铸造"},
        {"id": "belongsToRegime", "domain": "Mint", "range": "Regime", "description": "铸造机构隶属于某政权"},
        {"id": "overseesMint", "domain": "Person", "range": "Mint", "description": "人物主持某铸造机构事务"},
        {"id": "reformedCurrency", "domain": "Person", "range": "Regime / coin", "description": "人物主导某次币制改革"},
        {"id": "succeededBy", "domain": "Regime", "range": "Regime", "description": "政权更替关系，用于年代排序与时间轴展示"},
        {"id": "isVariantOf", "domain": "coin", "range": "CoinType", "description": "具体版式记录归属于某一钱币抽象类型"},
        {"id": "namedAfterEra", "domain": "coin", "range": "Era", "description": "钱币名称所依据的年号"},
        {"id": "mintedInRegion", "domain": "Mint", "range": "Region", "description": "铸造机构所在地区"},
        {"id": "circulatesIn", "domain": "coin", "range": "Region", "description": "钱币流通所及的地区"},
        {"id": "circulatesAlong", "domain": "coin", "range": "Route", "description": "钱币流通所经的路线"},
        {"id": "madeOf", "domain": "coin", "range": "Material", "description": "钱币制作所使用的主要材质"},
        {"id": "hasShape", "domain": "coin", "range": "Shape", "description": "钱币所属的基本形制"},
        {"id": "usesScript", "domain": "coin", "range": "Script", "description": "钱币钱文所使用的书体"},
        {"id": "sourcedFrom", "domain": "coin", "range": "Source_ref", "description": "钱币实体信息来源于具体文献或资料条目"},
    ]

    return jsonify({"entities": entities, "relations": relations})


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path.startswith("api/"):
        return jsonify({"error": "not found"}), 404

    if path == "":
        return send_from_directory(BASE_DIR, "index.html")

    safe_path = (BASE_DIR / path).resolve()
    if safe_path.is_file() and BASE_DIR in safe_path.parents or safe_path == BASE_DIR:
        return send_from_directory(BASE_DIR, path)

    return send_from_directory(BASE_DIR, "index.html")


if __name__ == "__main__":
    init_db()
    # 云平台（Render / Railway 等）通过 PORT 环境变量注入端口；本地默认 8000。
    _port = int(os.environ.get("PORT", "8000"))
    app.run(host="0.0.0.0", port=_port, debug=os.environ.get("FLASK_DEBUG") == "1")
