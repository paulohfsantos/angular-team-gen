import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'team-gen-app';

  newMember = "";
  members: string[] = [];
  errorMsg = "";
  numberOfTeams: number | string = "";
  teams: string[][] = [];

  onInput(member: string) {
    this.newMember = member;
  }

  onNumTeamsInput(n: string) {
    this.numberOfTeams = Number(n);
  }

  addMember() {
    if (!this.newMember) {
      this.errorMsg = "Please enter a name";
      return
    }

    this.errorMsg = "";
    this.members.push(this.newMember);
    this.newMember = "";
  }

  setNumberOfTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMsg = "Please enter a number";
      return
    }

    if(this.members.length < this.numberOfTeams) {
      this.errorMsg = "Please enter more members";
      return
    }

    this.errorMsg = "";

    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const random = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(random, 1)[0];

        if(!member) {
          break
        }

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = "";
    this.errorMsg = "";
  }
}
