# Ignite Delivery API
> um projeto desenvolvido no bootcamp `Ignite` da [Rocketset](https://rocketseat.com.br), ministrado pela [Daniele Leão](https://www.linkedin.com/in/daniele-le%C3%A3o-evangelista-5540ab25/?originalSubdomain=br).


### Tenha instalado

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/)
- [docker](https://docs.docker.com/engine/install/)
- [docker compose](https://docs.docker.com/compose/install/)

### Como Executar o projeto

1. clone o repositório

```
git clone https://github.com/luiz21goncalves/ignite-delivery.git
```

2. acesso o diretório e instale as dependências

```
cd ignite-delivery && yarn
```

3. configurar variáveis de ambiente

```
cp .env.example .env
cp .env.example .env.test
```
4. execute container do banco de dados

```
docker-compose up -d
```
5. execute as alterações no bando de dados

```
yarn prisma migrate dev
```

6. execute a aplicação

```
yarn dev
```

Você pode ver a documentação por acessando [http://localhost:3333/docs/v1](http://localhost:3333/docs/v1)
