#!/usr/bin/env python3
"""Gabungkan partial HTML menjadi index.html. Hanya membutuhkan Python standar."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
head = (SRC / "template-head.html").read_text(encoding="utf-8")
parts = [head]
parts.append((SRC / "layout" / "header.html").read_text(encoding="utf-8"))
parts.append("<main>\n")
order = json.loads((SRC / "sections-order.json").read_text(encoding="utf-8"))
for filename in order:
    parts.append((SRC / "sections" / filename).read_text(encoding="utf-8"))
parts.append("</main>\n")
parts.append((SRC / "layout" / "footer.html").read_text(encoding="utf-8"))
parts.append((SRC / "layout" / "floating-ui.html").read_text(encoding="utf-8"))
parts.append('<script src="js/app.js" defer></script>\n</body>\n</html>\n')
output = ROOT / "index.html"
output.write_text("\n".join(parts), encoding="utf-8")
print(f"Berhasil membuat {output}")
