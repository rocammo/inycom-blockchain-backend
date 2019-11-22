PROJECT = "inycom-blockchain-backend"


all: install build serve

install: ;@echo "Installing ${PROJECT}....."; \
	npm install

build: ;@echo "Building ${PROJECT}....."; \
	mkdir uploads

serve: ;@echo "Serving ${PROJECT}....."; \
	nodemon src

clean : ;
	rm -rf node_modules


.PHONY: install build serve clean