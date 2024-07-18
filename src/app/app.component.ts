import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LDService } from './ld.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FlagData, Item } from './Ld.model';
import { TableModule } from 'primeng/table';
import { response } from 'express';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NgFor, NgIf, TableModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
flagData: Item[] = [];
dropdownOpen: { [key: string]: boolean } = {};
  title = 'LD';
  isLoading= false;
  error= '';
searchText: any;
flags: any;



  constructor(private launchdarklyService: LDService) { }
  ngOnInit(): void {
    this.fetchFeatureFlags('ruchitha-demo-003');
    
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
      
    });
  }
  toggleDropdown(flagName: string, env: string) {
    const key = `${flagName}.${env}`;
    this.dropdownOpen[key] = !this.dropdownOpen[key];
  }
  updateFlag(projectKey: string, featureFlagKey: string, flag: Item, env: string, newState: boolean) {
    (flag.environments as any)[env].on = newState;
    const key = `${flag.name}-${env}`;
    this.dropdownOpen[key] = false;

    this.launchdarklyService.updateFlag(projectKey, featureFlagKey, env, newState).subscribe((response: any) => {
      if (typeof response === 'string') {
        this.error = response;
      } else {
        this.flagData = response.items;
      }
      this.isLoading = false;
      console.log(this.flagData);
    });
    
      
  }

 


 

 
}

