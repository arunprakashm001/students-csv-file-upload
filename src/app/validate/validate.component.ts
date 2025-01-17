import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  data: any[] = [];
  columns: string[] = ['Name', 'Email', 'Phone number', 'City', 'Address', 'GPA'];
  errors: any[] = [];

  ngOnInit(): void {
    const rawData = localStorage.getItem('csvData');
    this.data = rawData ? JSON.parse(rawData) : [];
    this.validateData();
  }

  validateData(): void {
    this.data.forEach((row, index) => {
      const rowErrors: any = {};
      this.columns.forEach((column) => {
        const value = row[column];
        if (!value) {
          rowErrors[column] = 'Empty value cannot be accepted';
        } else if (column === 'Email' && !this.isValidEmail(value)) {
          rowErrors[column] = 'Invalid email';
        } else if (column === 'Phone number' && !/^\d{10}$/.test(value)) {
          rowErrors[column] = 'Phone number must be 10 digits';
        } else if (column === 'GPA' && (isNaN(value) || value < 0 || value > 10)) {
          rowErrors[column] = 'GPA must be between 0 and 10';
        }
      });
      if (Object.keys(rowErrors).length > 0) {
        this.errors.push({ rowIndex: index, errors: rowErrors });
      }
    });

    const validRows = this.data.filter((_, index) => !this.errors.some(err => err.rowIndex === index));
    const invalidRows = this.data.filter((_, index) => this.errors.some(err => err.rowIndex === index));

    localStorage.setItem('validRows', JSON.stringify(validRows));
    localStorage.setItem('invalidRows', JSON.stringify(invalidRows));
  }

  hasError(rowIndex: number, column: string): boolean {
    const rowError = this.errors.find((err) => err.rowIndex === rowIndex);
    return rowError && rowError.errors[column];
  }

  getErrorMessage(rowIndex: number, column: string): string {
    const rowError = this.errors.find((err) => err.rowIndex === rowIndex);
    return rowError ? rowError.errors[column] : '';
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  proceed(): void {
    window.location.href = '/summary';
  }

}
