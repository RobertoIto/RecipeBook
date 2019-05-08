import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFetchData() {
    // Do not need to subscribe because we are doing this into the
    // dataStorageService.fetchData().
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
