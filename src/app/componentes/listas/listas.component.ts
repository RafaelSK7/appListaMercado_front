import { ListasService } from './../../servicos/listas.service';
import { Component } from '@angular/core';
import { Lista } from 'src/app/model/lista';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent {
  public listas: Lista[] = [];
  public novaLista: Lista;
  constructor(private service: ListasService) {
    this.novaLista = new Lista();
  }

  ngOnInit(): void {
    this.getAllListas();
  }

  public getAllListas() {
    this.service.recuperarListas().subscribe(
      (res: Lista[]) => {
        this.listas = res;
      },
      (err) => {
        alert('Erro ao recuperar listas de compras');
      }
    );
  }

  public cadastrarLista() {
    this.service.cadastrarLista(this.novaLista).subscribe(
      (res: Lista) => {
        alert('Nova lista cadastrada');
        this.getAllListas();
      },
      (err) => {
        alert('Erro ao cadastras nova lista');
      }
    );
  }
}
