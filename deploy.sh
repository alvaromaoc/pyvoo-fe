docker build -t pyvoo-fe .
docker rm pyvoo-fe
docker run --name pyvoo-fe -p 80:80 -d pyvoo-fe
