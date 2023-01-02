import { ListasService } from './../../servicos/listas.service';
import { ItemLista } from './../../model/ItermLista';
import { Component } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutosService } from 'src/app/servicos/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { ItenslistaService } from 'src/app/servicos/itenslista.service';
import { Lista } from 'src/app/model/lista';

@Component({
  selector: 'app-detalhelista',
  templateUrl: './detalhelista.component.html',
  styleUrls: ['./detalhelista.component.css']
})
export class DetalhelistaComponent {

  public listaProdutos: Produto[] = [];
  public novoProduto: Produto;
  public novoItem: ItemLista;
  public formNovoProduto: boolean = false;
  public idLista: number = 0;
  public listaCompras: Lista = new Lista();
  constructor(
    private produtoService: ProdutosService,
    private activatedRoute: ActivatedRoute,
    private itemListaServ: ItenslistaService,
    private listaService : ListasService
    ){
    this.novoProduto = new Produto();
    this.novoItem = new ItemLista();
    this.idLista = this.activatedRoute.snapshot.params['1']
    console.log(this.idLista)
  }


  ngOnInit(): void{
    this.recuperarTodosOsProdutos();
    this.recuperarDetalhesDaLista(this.idLista);
  }

  public recuperarDetalhesDaLista(idLista: number){
    this.listaService.recuperarPorId(this.idLista).subscribe(
      (res: Lista) => {
        this.listaCompras = res;
      },
      (err) => {
        alert("Não foi possível recuperar detalhes da lista")
      }
    )
  }

  public recuperarTodosOsProdutos(){
    this.produtoService.getAllProdutos().subscribe(
      (res: Produto[]) => {
        this.listaProdutos = res;
      },
      (err) => {
        alert("Erro ao recuperar Lista de Produtos");
      }
    );
  }

  public exibirModal(){
    document.getElementById("btnModal")?.click();
  }

  public habilitarNovoProduto(){
    this.formNovoProduto = true;
  }

  public cadastrarNovoProduto(){
    this.produtoService.addNewProduct(this.novoProduto).subscribe(
      (res: Produto) => {
        alert("Produto cadastrado com sucesso!")
        this.novoProduto = new Produto()
        this.recuperarTodosOsProdutos()
      },
      (err) => {
        alert("Erro ao cadastrar novo produto")
      }
    )
    this.formNovoProduto = false;

  }

  public adicionarItemLista(){
    this.novoItem.lista.id = this.idLista;
    this.itemListaServ.adicionarNovoItem(this.novoItem).subscribe(
      (res: ItemLista) => {
        alert("Novo item adicionado com sucesso!")
        this.novoItem = new ItemLista();
        this.recuperarTodosOsProdutos(this.idLista);
      },
      (err) => {
        alert("Não foi possível cadastrar novo item")
      }
    )

  }
}
