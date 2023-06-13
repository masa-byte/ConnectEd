import { Component } from '@angular/core';
import { Test } from './test.model';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  test: Test = {
    id: 0,
    duration: 0,
    project: undefined,
    questions: [],
  };
  constructor(private testService: TestService) {}
  back() {
    window.history.back();
  }
  createTest(projectId: number) {
    this.testService.createTest(this.test, projectId).subscribe();
  }
}
