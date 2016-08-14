default: gen1

gen1:
	python3 pok/base-stats.py

gen2:
	python3 pok/base-stats-2.py

.PHONY: gen-base-stats
