import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  
  public interactions:any[] = [];
  public treatment:any;
  tituloEj:any;
  arreglo:any;
  repetitions:any;
  series:any;
  interaction:any;
  rest:any;
  comments:any;
  idTratamiento:any;

  constructor(public dialogRef: MatDialogRef<PdfComponent>, public dataService : DataService, public http:HttpClient, @Inject(MAT_DIALOG_DATA) data) {
    this.arreglo = data;
  }

  ngOnInit(): void {}

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
        
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('programa.pdf');
    });     
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
