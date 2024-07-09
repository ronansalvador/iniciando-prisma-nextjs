
## 1. Inicializando o Projeto Next.js


```
npx create-next-app@latest nome-do-projeto
```
Entre no diretório do projeto:
```
cd nome-do-projeto
```
## 2. Instalando Prisma
Prisma é um ORM que facilita a interação com o banco de dados. Vamos instalá-lo:

```
npm install prisma --save-dev
```
```
npm install @prisma/client
```
Após a instalação, inicialize o Prisma no seu projeto:

```
npx prisma init
```
Isso criará um diretório prisma com um arquivo schema.prisma dentro dele.

## 3. Configurando o Prisma
No arquivo schema.prisma, configure seu banco de dados. Para este exemplo, usaremos um banco de dados SQLite, que é simples para testes e desenvolvimento local. Aqui está um exemplo de `schema.prisma`:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Agendamento {
  id        Int      @id @default(autoincrement())
  cliente   String
  data      DateTime
  servico   String
  criadoEm  DateTime @default(now())
  atualizadoEm DateTime @updatedAt
}
```

## 4. Migrando o Banco de Dados
Após configurar o `schema.prisma`, podemos executar a migração para criar as tabelas no banco de dados:

```
npx prisma migrate dev --name init
```

## 5. Gerando o Cliente Prisma
Após a migração, precisamos gerar o cliente Prisma para que possamos usá-lo em nosso código:

```
npx prisma generate
```

## 6. Configurando o Next.js para usar Prisma
Agora, vamos configurar nosso Next.js para usar o Prisma. Crie um arquivo `lib/prisma.ts` e adicione o seguinte código:

```
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;
```
7. Criando API Routes
Vamos criar uma rota de API para lidar com os agendamentos. Crie um arquivo em pages/api/agendamentos/route.ts:

### Metodo GET

```
import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const agendamentos = await prisma.agendamento.findMany()
    console.log(agendamentos)
    return NextResponse.json(agendamentos)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}

```
### Metodo POST

```

export async function POST(req: Request) {
  console.log('POST passou aqui')
  try {
    const { cliente, data, servico } = await req.json()
    const agendamento = await prisma.agendamento.create({
      data: {
        cliente,
        data: new Date(data),
        servico,
      },
    })
    console.log('agendamento', agendamento)
    return Response.json({ agendamento })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}

```
### Metodo DELETE

```

export async function DELETE(req: Request) {
  console.log('DELETE passou aqui')
  try {
    const { id } = await req.json()
    const agendamento = await prisma.agendamento.delete({
      where: { id: Number(id) },
    })
    console.log('agendamento deletado', agendamento)
    return NextResponse.json({ agendamento })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}

```
### Metodo PUT

```

export async function PUT(req: Request) {
  console.log('PUT passou aqui')
  try {
    const { id, cliente, data, servico } = await req.json()
    const agendamento = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: {
        cliente,
        data: new Date(data),
        servico,
      },
    })
    console.log('agendamento atualizado', agendamento)
    return NextResponse.json({ agendamento })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}

```
### Metodo PATCH

```

export async function PATCH(req: Request) {
  console.log('PATCH passou aqui')
  try {
    const { id, cliente, data, servico } = await req.json()
    const updateData = {}

    if (cliente !== undefined) {
      updateData.cliente = cliente
    }
    if (data !== undefined) {
      updateData.data = new Date(data)
    }
    if (servico !== undefined) {
      updateData.servico = servico
    }

    const agendamento = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: updateData,
    })
    console.log('agendamento atualizado', agendamento)
    return NextResponse.json({ agendamento })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'error',
        error,
      },
      { status: 500 },
    )
  }
}
```
## 8. Testando a API
Para testar a API, você pode usar uma ferramenta como Postman ou Insomnia, ou simplesmente usar fetch no console do navegador. Certifique-se de que o servidor Next.js esteja em execução:

```
npm run dev
```
Agora, você pode fazer um GET ou POST para http://localhost:3000/api/agendamentos.

