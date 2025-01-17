import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  totalRows: number = 0;
  validRows: number = 0;
  invalidRows: number = 0;

  ngOnInit(): void {
    const validRows = JSON.parse(localStorage.getItem('validRows') || '[]');
    const invalidRows = JSON.parse(localStorage.getItem('invalidRows') || '[]');

    this.totalRows = validRows.length + invalidRows.length;
    this.validRows = validRows.length;
    this.invalidRows = invalidRows.length;
  }
}


