/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MercadoBitcoinService } from 'src/app/services/custom/mercado-biticon.service';

@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent implements OnInit {
  trades: any[];
  ticker: any;
  orderbook: any;
  now: string;
  sells: any;
  buys: any;
  settings = {
    columns: {
      tid: {
        title: 'ID'
      },
      newdate: {
        title: 'DATE'
      },
      type: {
        title: 'TYPE'
      },
      price: {
        title: 'PRICE'
      },
      amount: {
        title: 'AMOUNT'
      }
    }
  };

  constructor(private service: MercadoBitcoinService) {
    this.loadData = this.loadData.bind(this);
  }

  ngOnInit() {
    this.reload();
  }
  loadData() {
    this.service.trades().subscribe(result => {
      this.trades = result;
      this.sells = result.filter((x: any) => x.type === 'sell');
      this.buys = result.filter((x: any) => x.type === 'buy');
    });

    this.service.ticker().subscribe(result => {
      this.ticker = result;
      this.ticker.buyHV = this.pct(result.high, result.buy);
      this.ticker.buyLV = this.pct(result.low, result.buy);

      this.ticker.sellHV = this.pct(result.high, result.sell);
      this.ticker.sellLV = this.pct(result.low, result.sell);

      this.ticker.now = new Date();
    });

    this.service.orderbook().subscribe(result => {
      this.orderbook = result;
    });
  }

  pct(v1: number, v2: number) {
    return ((v1 / v2 - 1) * 100).toFixed(2);
  }

  reload() {
    this.loadData();
    setTimeout(() => {
      // this.reload();
    }, 1000);
  }
}
