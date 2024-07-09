import prisma from '../../lib/prisma'
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
