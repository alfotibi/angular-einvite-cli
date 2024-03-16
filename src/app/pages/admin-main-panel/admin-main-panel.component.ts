import { query } from '@angular/animations';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Member } from '../../models/Member';
import { CommunicationService } from '../../service/communication.service';

/**
 * @title Admin panel with pagination
 */
@Component({
  selector: 'app-admin-main-panel',
  templateUrl: './admin-main-panel.component.html',
  styleUrl: './admin-main-panel.component.scss'
})
export class AdminMainPanelComponent implements OnInit, AfterViewInit  {
  editingElement: any = null;
  editingField: string = '';

  displayedColumns: string[] = ['position', 'email', 'firstname', 'sirname', 'menu', 'accomodation', 'allergies', 'delete'];
  // dataSource = new MatTableDataSource<PartyMember>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Member>();
  everyParticipant: number = 0;
  vegetarianMenuCount: number = 0;
  normalMenuCount: number = 0;
  accomodatinCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.loadMembers();
    console.log("DEBUG");
    this.dataSource.data.forEach(member => {
      console.log(member);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  recomputeTotals(datasource:  MatTableDataSource<Member>) {
    datasource.data.forEach(element => {
      console.log(element);
    });
    this.everyParticipant = datasource.data.length
    this.vegetarianMenuCount = datasource.data.filter(item => item.IsVegan === true).length;
    this.normalMenuCount = datasource.data.length - this.vegetarianMenuCount;
    this.accomodatinCount = datasource.data.filter(item => item.RequiresAccommodation === true).length;

    return datasource.data.length;
  }


  loadMembers() {
    this.communicationService.getMembers().subscribe(members => {
      this.dataSource = new MatTableDataSource<Member>(members);
    }, error => {
      console.error('Error fetching members:', error);
    });
  }

  startEdit(element: any, field: string): void {
    this.editingElement = element;
    this.editingField = field;
  }

  stopEdit(): void {
    // Itt hívd meg a szolgáltatásodat a frissítéshez
    // Például: this.myService.updateElement(this.editingElement);
    if (this.editingElement && this.editingField) {
      this.communicationService.updateMember(this.editingElement.id, this.editingElement).subscribe(() => {
        this.loadMembers(); // Adatok újratöltése
      });
    }
    this.editingElement = null;
    this.editingField = '';
  }

  isEditing(element: any, field: string): boolean {
    return this.editingElement === element && this.editingField === field;
  }

  deleteElement(element: any) {
    // Itt hívd meg a törlés logikáját a szolgáltatásból
    // Például: this.myService.deleteElement(element.id);
  
    // Itt töröld az elemet a dataSource-ból és frissítsd a megjelenítést
    const index = this.dataSource.data.indexOf(element);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      // Szükség esetén frissítsd az adatokat a backenden is
      // this.myService.deleteElement(element.id).subscribe(...);
    }

    this.communicationService.deleteMember(element.id).subscribe(() => {
      this.loadMembers(); // Adatok újratöltése
    });
    // Ha megjelenítési frissítésre van szükség, pl. adatforrás frissítése
    // Ha a dataSource egy MatTableDataSource példány, akkor:
    // this.table.renderRows();
    // vagy frissítsd a dataSource-t, ha szükséges
    this.dataSource.data = [...this.dataSource.data];
  }

}