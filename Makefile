default: base-stats

base-stats:
	python3 pok/base-stats.py

web:
	python3 web/update-files.py

all:
	python3 pok/base-stats.py
	python3 web/update-files.py

.PHONY: base-stats web
