import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Renderer2, OnInit  } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-user-program-presentation',
  template: `
  <!-- A többi tartalom -->
  <div #printContainer></div>
`,
  templateUrl: './user-program-presentation.component.html',
  styleUrl: './user-program-presentation.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('100ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        )
      ])
    ])
  ]
  
})
export class UserProgramPresentationComponent implements OnInit {
  @ViewChild('printContainer', { read: ViewContainerRef }) printContainer!: ViewContainerRef;
  items: string[] = []

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2){

  }

  ngOnInit() {
    this.loadItems(); // Elemek betöltése az inicializáláskor
  }

  loadItems() {
    const programItems = [
      "[17:00] Templomi szertartás",
      "[18:00-19:30] Fotózás a vendégekkel a régifőtéren",
      "[20:30] Nyitótánc",
      "[20:40] Köszöntőbeszéd",
      "[22:00] 'Move On' zenekar koncertje",
      "[23:00] 'The Konnektion' zenekar koncertje",
      "[00:30] Torta",
    ];

    programItems.forEach((item, index) => {
      // Hozzáadunk egy kis késleltetést, hogy egymás után jelenjenek meg az elemek
      setTimeout(() => this.items.push(item), index * 100);
    });
  }

  safePrintProgram() {
    const printContainer = document.querySelector('.card-container')!.cloneNode(true) as Element;
  
    // Most már használhatjuk a querySelector-t az Element-en
    const printButton = printContainer.querySelector('.program-user-control');
    
    // Ellenőrizzük, hogy a printButton nem null, és ha nem, akkor eltávolítjuk
    if (printButton) {
      printButton.remove();
    }
    // const printContents = document.querySelector('.card-container')!.innerHTML;
    // Kinyerjük a klonozott elem innerHTML-jét
    const printContents = printContainer.innerHTML;
    const printWindow = window.open('', '_blank', 'top=0,left=0,width=800,height=600');
    
    if (printContents && printWindow) {
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Zotyó és Dorcy esküvõ - program </title>
          <style>
            // Itt add meg a nyomtatási stílusokat
          </style>
        </head>
        <body>
          ${printContents}
          <script>
            window.onload = function() {
              window.print();
              window.onfocus = function() { window.close(); };
            };
          </script>
        </body>
      </html>`
    );

    printWindow.document.close(); // Fontos, hogy a dokumentumot bezárjuk a írás után
    }
    else {
      console.log("Error on exporting the PDF.");
    }
  }
}
