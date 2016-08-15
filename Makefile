default: base-stats

base-stats:
	python3 pok/base-stats

web:
	python3 web/update-files.py

.PHONY: base-stats web
