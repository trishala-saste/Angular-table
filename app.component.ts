import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import {  PageEvent } from '@angular/material/paginator';

import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';



export interface Item {
  name: string;
  id : number;
  age: number;
  city: string;
  occupation: string;
  email: string;
  phone: number;
  education: string;
  hobbies: string;
  favoriteColor: string;
  maritalStatus: string;
  nationality: string;
  address: string;
  employeeid: number;
  department: string;
  gender: string;
  pincode : number;
  salary : number;
  isSelected: boolean;
 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit{
  
  @ViewChild(MatSort) sort: MatSort | undefined;
  // @ViewChild(MatPaginator) paginator !: MatPaginator;

  editedItem: Item | null = null;
  

  // selectedRow: Item | null = null;
  isAnyRowSelected: boolean = false;
  isAllSelected: boolean = false;
  
  isEditing = false;

  editingRow: any | null = null;

  
 

   constructor(private router: Router) {}

  

  data: any[] = [
    { name: 'John Doe', id:'1', age: 30, city: 'New York' ,
    occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Reading',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'New York',
    address: '120 Main Street, Apt 4B, New York, NY', employeeid: '987651',
     department:'IT', gender:'male',pincode:'416 111', salary : '25000'},
    { name: 'Jane Smith',id:'2', age: 25, city: 'Los Angeles',occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4568',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Hiking',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'American',
    address: '123 Main Street, Apt 4B, New York, NY', employeeid: '987652', 
    department:'IT', gender:'male',pincode:'416 111',salary : '125000' },
    { name: 'Bob Johnson',id:'3', age: 35, city: 'Chicago',occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4566',
    education: 'Bachelor of Science in Computer Science',
    hobbies: ' Coding',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'UK',
    address: '123 Main Street, Apt 4B, New York, NY', employeeid: '987652',
     department:'IT', gender:'male' ,pincode:'416 111',salary : '225000'},
    { name: 'Alice Brown', id:'4', age: 28, city: 'San Francisco',occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Swimming',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'USA',
    address: '123 Main Street, Apt 4B, New York, NY', employeeid: '987654',
    department:'IT', gender:'male' ,pincode:'416 112',salary : '325000'},
    { name: 'John Doe', id:'5', age: 30, city: 'New York' ,occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4577',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Reading',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'USA',
    address: '123 Main Street, Apt 4B, New York, NY', employeeid: '987652',
     department:'IT', gender:'male',pincode:'416 111',salary : '255000'},
    { name: 'Jane Smith', id:'6', age: 25, city: 'Los Angeles',occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4587',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Coding',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'American',
    address: '123 Main Street, Apt 4B, New York, NY', 
    employeeid: '987654', department:'IT', gender:'male' ,pincode:'416 111',salary : '65000'},
    { name: 'Bob Johnson', id:'7', age: 35, city: 'Chicago' ,occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-8567',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Reading',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'UK',
    address: '123 Main Street, Apt 4B, New York, NY',
     employeeid: '987654', department:'IT', gender:'male',pincode:'416 111',salary : '55000'},
    { name: 'Alice Brown', id:'8', age: 28, city: 'San Francisco',occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4667',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Coding',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'American',
    address: '123 Main Street, Apt 4B, New York, NY', 
    employeeid: '987654', department:'IT', gender:'male' ,pincode:'416 121',salary : '29000'},
    { name: 'John Doe', id:'9', age: 30, city: 'New York' ,occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Hiking',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'American',
    address: '123 Main Street, Apt 4B, New York, NY',
     employeeid: '983654', department:'IT', gender:'male',pincode:'416 111',salary : '27000'},
    { name: 'Jane Smith', id:'10', age: 28, city: 'Los Angeles' ,occupation: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    education: 'Bachelor of Science in Computer Science',
    hobbies: 'Reading, Hiking, Coding',
    favoriteColor: 'Blue',
    maritalStatus: 'Single',
    nationality: 'USA',
    address: '123 Main Street, Apt 4B, New York, NY', 
    employeeid: '987654', department:'IT', gender:'male',pincode:'416 111',salary : '55000'},
    
  ];

  checkboxState: boolean = false;

  filteredData: any[] = this.data;
  pageData: any[] = [];
  pageIndex = 0;
  pageSize = 7;

  calculateItemCount(): string {
    const startIndex = this.pageIndex * this.pageSize + 1;
    const endIndex = Math.min((this.pageIndex + 1) * this.pageSize, this.filteredData.length);
    const totalItems = this.filteredData.length;
    return `Showing ${startIndex} - ${endIndex} of ${totalItems} items`;
  }

  
  
  /* 
  saveChanges(): void {
    // Update the data source with the changes
    if (this.selectedRow) {
      // Find the index of the selectedRow in the data array
    const index = this.data.findIndex(item => item === this.selectedRow);

    if (index !== -1) {
      // Update the data in the array with the changes made to selectedRow
      this.data[index] = this.selectedRow;

      // Reset the selectedRow and editing flag
      this.selectedRow = null;
      this.isEditing = false;
    } else {
      console.error('Selected row not found in the data array.');
    }
    }
  } */

 /*  cancelEditing(): void {
    this.isEditing = false;
    this.selectedRow = null;
  } */

  onNameChange(newValue: string) {
    if (this.editedItem) {
      this.editedItem.name = newValue;
    }
  }

  selectedRow: any = null;

  editForm: FormGroup = new FormGroup({
   
    name: new FormControl(''),
    id: new FormControl(''),
    age: new FormControl(''),
    city: new FormControl(''),
    occupation: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    education: new FormControl(''),
    hobbies: new FormControl(''),
    favoriteColor:new FormControl(''),
    maritalStatus: new FormControl(''),
    nationality: new FormControl(''),
    address: new FormControl(''),
    employeeid: new FormControl(''),
    department: new FormControl(''),
    gender: new FormControl(''),
    pincode: new FormControl(''),
    salary: new FormControl('')
  });



  editRow(row: any) {
    this.editingRow = { ...row };
  }

  saveEdit() {
    const index = this.data.findIndex(any => any.id === this.editingRow?.id);
    if (index >= 0) {
      const editedRowCopy = { ...this.editingRow };
      this.data[index] = editedRowCopy;
      this.editingRow = null;
    }
  }

  cancelEdit() {
    this.editingRow = null;
  }
  onRowSelectionChange(): void {
    
    this.isAnyRowSelected = this.data.some((item) => item.isSelected);
    this.isAllSelected = this.data.every((item) => item.isSelected);
  }

  
  selectAllItems(event: any): void {
    const isSelectAll = event.checked;
    this.data.forEach((item) => (item.isSelected = isSelectAll));
    this.isAnyRowSelected = isSelectAll;
  }
  

  // filteredData: any[] = this.data;

  columnsToDisplay = ['name','id', 'age', 'city', 'occupation', 'email', 'phone', 'education', 'hobbies', 'favoriteColor', 'maritalStatus', 'nationality', 'address', 'employeeid', 'department', 'gender', 'pincode', 'salary','actions'];

  
  nameFilter = '';
  idFilter = '';
  ageFilter = '';
  cityFilter = '';
  occupationFilter = '';
  emailFilter = '';
  phoneFilter = '';
  educationFilter = '';
  hobbiesFilter = '';
  favoriteColorFilter = '';
  maritalStatusFilter = '';
  nationalityFilter = '';
  addressFilter = '';
  employeeidFilter = '';
  departmentFilter = '';
  genderFilter = '';
  pincodeFilter = '';
  salaryFilter = '';

  
showAllColumnsFlag: boolean = false;


showAllColumns() {
  this.showAllColumnsFlag = !this.showAllColumnsFlag;
}

 ngOnInit() {
    this.updatePageData();
    this.editedItem = {} as Item;
    this.updatePageData();
    this.data.forEach(item => (item.isSelected = false));
  }
 


  ngAfterViewInit() {
    if (this.sort) {
      this.sort.sortChange.subscribe(() => {
        this.sortData();
      });
    }
 
  }

  sortData() {
    if (this.sort) {
      const data = this.filteredData.slice(); 
      const isAsc = this.sort.direction === 'asc';
      const column = this.sort.active;

      data.sort((a, b) => {
        switch (column) {
          
          case 'name':
            return this.compare(a.name, b.name, isAsc);
            case 'id':
            return this.compare(a.id, b.id, isAsc);
          case 'age':
            return this.compare(+a.age, +b.age, isAsc);
          case 'city':
            return this.compare(a.city, b.city, isAsc);
            case 'occupation':
              return this.compare(a.occupation, b.occupation, isAsc);
              case 'email':
              return this.compare(a.email, b.email, isAsc);

              case 'phone':
                return this.compare(a.phone, b.phone, isAsc);
                case 'education':
                  return this.compare(a.education, b.education, isAsc);
                  case 'hobbies':
                    return this.compare(a.hobbies, b.hobbies, isAsc);
                    case 'favoriteColor':
                      return this.compare(a.favoriteColor, b.favoriteColor, isAsc);
                      case 'maritalStatus':
                      return this.compare(a.maritalStatus, b.maritalStatus, isAsc);
                      case 'nationality':
                      return this.compare(a.nationality, b.nationality, isAsc);
                      case 'address':
                      return this.compare(a.address, b.address, isAsc);
                      case 'employeeid':
                        return this.compare(a.employeeid, b.employeeid, isAsc);
                        case 'department':
                          return this.compare(a.department, b.department, isAsc);
                          case 'gender':
                          return this.compare(a.gender, b.gender, isAsc);
                          case 'pincode':
                            return this.compare(a.pincode, b.pincode, isAsc);
                            case 'salary':
                              return this.compare(a.salary, b.salary, isAsc);
          default:
            return 0;
        }
      });

      this.filteredData = data;
    }
  }


  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  applyFilter() {
    this.filteredData = this.data.filter(item =>
  
      item.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      item.id.toString().includes(this.idFilter)&&
      item.age.toString().includes(this.ageFilter) &&
      item.city.toLowerCase().includes(this.cityFilter.toLowerCase())&&
      item.occupation.toLowerCase().includes(this.occupationFilter.toLowerCase())&&
      item.email.toLowerCase().includes(this.emailFilter.toLowerCase())&&
      item.phone.toString().includes(this.phoneFilter)&&
      item.education.toLowerCase().includes(this.educationFilter.toLowerCase())&&
      item.hobbies.toLowerCase().includes(this.hobbiesFilter.toLowerCase())&&
      item.favoriteColor.toLowerCase().includes(this.favoriteColorFilter.toLowerCase())&&
      item.maritalStatus.toLowerCase().includes(this.maritalStatusFilter.toLowerCase())&&
      item.nationality.toLowerCase().includes(this.nationalityFilter.toLowerCase())&&
      item.address.toLowerCase().includes(this.addressFilter.toLowerCase())&&
      item.employeeid.toString().includes(this.employeeidFilter)&&
      item.department.toLowerCase().includes(this.departmentFilter.toLowerCase())&&
      item.gender.toLowerCase().includes(this.genderFilter.toLowerCase())&&
      item.pincode.toString().includes(this.pincodeFilter)&&
      item.pincode.toString().includes(this.pincodeFilter)
      
      
    );
     this.pageIndex = 0; 
  this.updatePageData(); 
  this.sortData();
  }
  updatePageData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageData = this.filteredData.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePageData();
    }
  }

  nextPage() {
    const totalPages = this.totalPages();
    if (this.pageIndex < totalPages - 1) {
      this.pageIndex++;
      this.updatePageData();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
  
  
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }
  
  exportToCsv() {
    const dataToExport = this.filteredData.map(item => ({
     
      Name: item.name,
      Id:item.id,
      Age: item.age,
      City: item.city,
      Occupation: item.occupation,
      Email: item.email,
      Phone: item.phone,
      Education: item.education,
      Hobbies: item.hobbies,
      FavoriteColor: item.favoriteColor,
      MaritalStatus: item.maritalStatus,
      Nationality: item.nationality,
      Address: item.address,
      EmployeeID: item.employeeid,
      Department: item.department,
      Gender: item.gender,
      Pincode: item.pincode,
      Salary: item.salary
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'data.csv');
  }

  exportToExcel() {
    const dataToExport = this.filteredData.map(item => ({
     
      Name: item.name,
      Id: item.id,
      Age: item.age,
      City: item.city,
      Occupation: item.occupation,
      Email: item.email,
      Phone: item.phone,
      Education: item.education,
      Hobbies: item.hobbies,
      FavoriteColor: item.favoriteColor,
      MaritalStatus: item.maritalStatus,
      Nationality: item.nationality,
      Address: item.address,
      EmployeeID: item.employeeid,
      Department: item.department,
      Gender: item.gender,
      Pincode: item.pincode,
      Salary: item.salary
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, 'data.xlsx');
  }

  /* exportToPdf() {
    const dataToExport = this.filteredData.map((item) => ({
      Name: item.name,
      Age: item.age,
      City: item.city,
      Occupation: item.occupation,
      Email: item.email,
      Phone: item.phone,
      Education: item.education,
      Hobbies: item.hobbies,
      FavoriteColor: item.favoriteColor,
      MaritalStatus: item.maritalStatus,
      Nationality: item.nationality,
      Address: item.address,
      EmployeeID: item.employeeid,
      Department: item.department,
      Gender: item.gender,
      Pincode: item.pincode,
      Salary: item.salary,
    }));

    const doc = new jsPDF('p', 'pt');
    doc.autoTable({
      head: [['Name', 'Age', 'City', 'Occupation', 'Email', 'Phone', 'Education', 'Hobbies', 'Favorite Color', 'Marital Status', 'Nationality', 'Address', 'Employee ID', 'Department', 'Gender', 'Pincode', 'Salary']],
      body: dataToExport,
    });

    doc.save('data.pdf');
  } */
  navigateToDetails(employeeId: number) {
    this.router.navigate(['/details', employeeId]);
  }
 

}
