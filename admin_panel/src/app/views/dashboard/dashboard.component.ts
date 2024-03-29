import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/core/services';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void { 
  }
}
