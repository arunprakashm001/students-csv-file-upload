import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isValidFile = false;
  csvData: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
  
    if (file && file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true, 
        skipEmptyLines: true,
        complete: (result: Papa.ParseResult<any>) => {
          const data: any[] = result.data; 
          if (data.length === 0) {
            alert('The file is empty or invalid.');
            this.isValidFile = false;
            return;
          }
  
          const headers = Object.keys(data[0]);
          if (!this.validateHeaders(headers)) {
            alert('Invalid file format. Missing required columns.');
            return;
          }

          this.csvData = data; 
          localStorage.setItem('csvData', JSON.stringify(this.csvData)); 
          this.isValidFile = true;
        },
        error: (error) => {
          alert('Error parsing file: ' + error.message);
          this.isValidFile = false;
        },
      });
    } else {
      alert('Only CSV files are allowed.');
      this.isValidFile = false;
    }
  }
  
  validateHeaders(headers: string[]): boolean {
    const requiredColumns = ['Name', 'Email', 'Phone number', 'City', 'Address', 'GPA'];
    return requiredColumns.every((col) => headers.includes(col));
  }
  
  
  proceed(): void {
    if (this.isValidFile) {
      localStorage.setItem('csvData', JSON.stringify(this.csvData));
      window.location.href = '/validate';
    }
  }

}
