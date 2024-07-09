import prisma from '../../lib/prisma'
import { NextResponse } from 'next/server'

interface Agendamento {
  cliente: string
  date: string
  servico: string
}

interface UpdateAgendamento {
  id: number
  cliente: string
  date: string
  servico?: string
}

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
    const { cliente, date, servico }: Agendamento = await req.json()
    const agendamento = await prisma.agendamento.create({
      data: {
        cliente,
        data: new Date(date),
        servico,
      },
    })
    console.log('agendamento', agendamento)
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

export async function DELETE(req: Request) {
  console.log('DELETE passou aqui')
  try {
    const { id }: { id: number } = await req.json()
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
    const { id, cliente, date, servico }: UpdateAgendamento = await req.json()
    const agendamento = await prisma.agendamento.update({
      where: { id: Number(id) },
      data: {
        cliente,
        data: new Date(date),
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
    const { id, cliente, date, servico }: UpdateAgendamento = await req.json()
    const updateData: Partial<Agendamento> = {}

    if (cliente !== undefined) {
      updateData.cliente = cliente
    }
    if (date !== undefined) {
      updateData.date = new Date(date).toISOString()
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
