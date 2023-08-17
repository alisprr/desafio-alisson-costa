class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (
      formaDePagamento !== "debito" &&
      formaDePagamento !== "credito" &&
      formaDePagamento !== "dinheiro"
    ) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;
    let extras = {};

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");

      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }

      const item = this.cardapio[codigo];

      if (codigo !== "chantily" && codigo !== "queijo") {
        valorTotal += item.valor * parseInt(quantidade);
      } else {
        extras[codigo] = (extras[codigo] || 0) + parseInt(quantidade);
      }
    }

    if (extras.chantily && !extras.cafe) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (extras.queijo && !extras.sanduiche) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95; // 5% de desconto
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03; // 3% de acréscimo
    }

    if (valorTotal === 0) {
      return "Quantidade inválida!";
    }

    const valorFormatado = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;

    return valorFormatado;
  }
}

export { CaixaDaLanchonete };
