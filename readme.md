# Desafio LifeApps!

### Introdução

Esse de código é um microserviço baseado nos requisitos do desafio técnico para uma vaga da empresa LifeApps.


### Como executar?
Foi criado um docker-compose.yml por fora das pastas `inventory` e `orders`, é necessário apenas executar o comando `docker compose up` ou `docker-compose up` para que sejam startadas a duas aplicações.

### Rotas da aplicação: 
*obs: tem um arquivo de importação de rotas do insomnia na raiz do projeto, chamado: `lifeapps-insomnia.json`*

### Rotas /GET

/get-orders - busca todos os pedidos
/get-products

/get-order/:id - Busca 1 (um) pedido pelo seu ID
/get-product:id

### Rotas /POST

/create-product
body: `{
	"nome": "coca-cola",
	"price": 5.0,
	"description": "coca-cola zero açucar",
	"quantity": 5000
}`

/create-order
body: `{
	"costumer_id": 456465,
	"products": [
		{
			"id": "6660af64f08dc5c68ba80ac1",
			"quantity": 1
		}
	]
}`


### Rotas /PUT

/update-order/:id

    "APPROVED" || "CANCELED" || "DENIED"

body: `{	"status": "APPROVED"}`

/update-product/:id
body:`{
	"nome": "coca-cola",
	"price": 10.0,
	"description": "coca-cola com açucar",
	"quantity": 10
}`


/add-product/:id
body:`{
	"quantity": 10
}`

/sub-product/:id
body:`{
	"quantity": 10
}`


### Rotas /DELETE
/delete-product/:id

/delete-order/:id

# Considerações finais	

Obrigado a todos da LifeApps e da MaximaTech por me convocarem a fazer parte do processo seletivo.