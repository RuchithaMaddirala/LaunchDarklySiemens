import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LDService } from './ld.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FlagData, Item } from './Ld.model';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NgFor, NgIf, TableModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
flagData: Item[] = [];
  title = 'LD';
  isLoading= false;
  error= '';
searchText: any;
flags: any;



  constructor(private launchdarklyService: LDService) { }
  ngOnInit(): void {
    this.fetchFeatureFlags('ruchitha-demo-003');
    this.fetchFeatureFlagStatuses('ruchitha-demo-003');
    


  }

  fetchFeatureFlags(projectKey: string): void {
    this.isLoading = true;
    this.launchdarklyService.getFeatureFlags().subscribe( (response: FlagData) => {
      if (typeof response === 'string') {
        this.error = response;
      } else {
        this.flagData = response.items;
      }
      this.isLoading = false;
      console.log(this.flagData);
      console.log("flagData response:" + this.flagData);
    });
  }

  

  fetchFeatureFlagStatuses(projectKey: string): void {
    this.isLoading = true;
    this.launchdarklyService.getFeatureFlagStatuses().subscribe( (response2:any) => {
      if (typeof response2 === 'string') {
        this.error = response2;
      } else {
        this.fetchFeatureFlagStatuses = response2;
      }
      this.isLoading = false;
      console.log(response2);
    });
  }


 

 
}

