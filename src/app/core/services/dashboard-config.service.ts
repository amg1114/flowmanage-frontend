import { Injectable } from '@angular/core';
import { DashboardConfig } from '../interfaces/dashboard/dashboard-config.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardConfigService {
  private configData!: DashboardConfig;
  private DASHBOARD_CONFIG_KEY = 'dashboard_config';

  constructor() {
    const config = localStorage.getItem(this.DASHBOARD_CONFIG_KEY);
    if (config) {
      this.configData = JSON.parse(config);
      return;
    }

    this.setConfig({ selectedWorkflow: null });
  }

  setConfig(config: DashboardConfig): void {
    this.configData = config;
    localStorage.setItem(this.DASHBOARD_CONFIG_KEY, JSON.stringify(config));
  }

  setSelectedWorkflow(workflowId: number): void {
    this.configData.selectedWorkflow = workflowId;

    localStorage.setItem(
      this.DASHBOARD_CONFIG_KEY,
      JSON.stringify(this.configData),
    );
  }

  getSelectedWorkflow(): number | null {
    return this.configData.selectedWorkflow;
  }
}
