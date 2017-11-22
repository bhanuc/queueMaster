##Tarantool Queue Server


#### To install:
```
npm install && cd ui && npm install
```

#### Instructions to start API server:
```
npm start
```
API server listens on http://localhost:4000/
and API documentation can be viewed on
http://localhost:4000/redoc and http://localhost:4000/swagger
#### Instructions to start UI-server:

```
cd ui
npm start
```
#### 
UI of QueueMaster is available on http://localhost:3000/

Prerequisites: 
Node 8.9 LTS
Tarantool listening on 3301

If you don't have Tarantool installed on your machine, you can use docker to get one for testing
```
docker run --name mytarantool -p3301:3301 -d tarantool/tarantool:1.7
```