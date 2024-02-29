import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CompanyComponent } from '../company/company.component';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    LucideAngularModule,
    NzButtonModule,
    CommonModule,
    CompanyComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {

  title = {
    firstname: 'R Ravikiran',
    lastname: 'Jonnapalli'
  };

  introlist = [
    'Senior Software Engineer (MEAN) at Cameo Global Hyderabad.',
    '5+ Years of experience on MEAN stack technologies (Backend heavy).',
    'Skilled in analyzing features, designing impactful solutions, and optimizing existing product problems.',
    'Excellent debugging skills for solving complex issues.'
  ].map((text, i) => ({ text, id: i + 1, bold: i === 0 }));

  infolist = [
    { id: 1, text: 'R Ravikiran Jonnapalli' },
    { id: 2, mail: true, text: 'r.ravikiranjonnapalli@gmail.com' },
    { id: 3, call: true, text: '+919494124972' }
  ]

  linkedIn = 'https://www.linkedin.com/in/rrkjonnapalli';
  github = 'https://github.com/rrkjonnapalli';
  myProjects = ['apps'];

  skills = [
    'Node.js',
    'MongoDB',
    'Angular',
    'Express',
    'Git',
    'REST API',
    'Web Development',
    'Kafka',
    'NIFI'
  ].map((text, i) => typeof text !== 'string' ? text : ({ text, id: i + 1, bold: i == 1 }));

  experiences = [
    {
      id: 3,
      title: 'Cameo Global',
      location: 'Telangana, Hyderabad',
      position: 'Senior Software Engineer',
      duration: 'Nov 2022 - Present',
      info: [],
      projects: [
        {
          id: 'hc-1',
          name: 'Hubconnect Carrier',
          tech: 'Node.js, MongoDB, Angular, Express, Azure Service Bus',
          info: [
            'Worked on developing new features which includes REST API and UI development.',
            'Finding the root causes for the production issues, and solving them.'
          ]
        },
        {
          id: 'hc-2',
          name: 'Equipment Portal',
          tech: 'Node.js, MongoDB, Angular, Express',
          info: [
            'Worked on developing new features which includes REST API and UI development.'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Loyalty Methods (Rythmos)',
      location: 'Telangana, Hyderabad',
      position: 'Senior Associate Consultant',
      duration: 'Apr 2019 - Oct 2022',
      info: [
        'Worked on multiple projects in the organization like Reactor CX (RCX), DM (Data migration for RCX), Member Care Portal (MCP), Feedx, One Click which core part of the organization.'
      ],
      projects: [
        {
          id: 'rcx',
          name: 'Reactor-CX (RCX)',
          tech: 'Node.js, MongoDB, Angular.js, Express.js, Kafka, Elasticsearch, Javascript, Mocha, chai',
          info: [
            'Worked on backend for creating REST APIs, cron jobs, optimized high computing funcationalities.',
            'Implemented cron jobs for periodic data migrations, optimizing processes and reducing CPU consumption.'
          ]
        },
        {
          id: 'rcx-dm',
          name: 'DM (Part of RCX)',
          tech: 'Shell, MongoDB, Javascript',
          info: [
            'Developed bash and MongoDB shell scripts for efficient client migrations.'
          ]
        },
        {
          id: 'rcx-mcp',
          name: 'Member Care Portal',
          tech: 'Node.js, Angular, Typescript',
          info: [
            'Redesigned the project to integrate multiple clients based on configuration.',
            'Integrated PowerBI reports, enhancing client analytics capabilities.'
          ]
        },
        {
          id: 'rcx-feedx',
          name: 'Feedx',
          tech: 'Node.js, Apache NIFI',
          info: [
            'Implemented an automation process for creating NIFI flows, enabling clients to configure migrations seamlessly.',
            'Designed configurations for NIFI Jobs.'
          ]
        },
        {
          id: 'rcx-one-click',
          name: 'One Click',
          tech: 'Node.js, AWS',
          info: [
            'Implemented an automation process for creating a working aws environment for entire application infrastructure with multiple microservices using Node.js and awssdk.'
          ]
        }
      ]
    },
    {
      id: 1,
      title: 'Way2Online',
      location: 'Telangana, Hyderabad',
      position: 'Product Engineer',
      duration: 'May 2017 - Feb 2019',
      info: [],
      projects: [
        {
          id: 'way2-dmp',
          name: 'DMP (Data Management Platform)',
          tech: 'Python, MongoDB, Cassandra DB',
          info: [
            'Developed data point processing for multiple data points to create a user profile, enhancing E-Mail campaign targeting.'
          ]
        },
        {
          id: 'way2-push',
          name: 'Way2Push',
          tech: 'Node.js, Loopback, Angular',
          info: [
            'Developed front-end application structure and services for showcasing push notification campaigns.'
          ]
        },
        {
          id: 'way2-self-serve',
          name: 'Self Serve Campaign Server',
          tech: 'Node.js, Express',
          info: [
            'Developed APIs for Google AdWords, Facebook, Twitter ad campaigns for internal campaign management (Self Serve)',
            'Abstraction of API for different campaigns based on required platform from APIs.'
          ]
        }
      ]
    }, null
  ];

  styles: any = [];
  isDesktop = true;

  constructor(private router: Router) {
    this.styles = this.snake();
    if (window.innerWidth < 1023) {
      this.swithToMobile();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = _.get(event, 'target.innerWidth', 1025);
    if (width < 1024) {
      this.swithToMobile();
    } else {
      this.swithToDesktop();
    }
  }

  swithToMobile() {
    if (!this.isDesktop) return;
    this.isDesktop = false;
    this.styles = this.styles.map((e: any, i: number) => i % 2 === 0 ? 'bg-black' : 'bg-white');
  }

  swithToDesktop() {
    if (this.isDesktop) return;
    this.isDesktop = true;
    this.styles = this.snake();
  }

  getStyle(id: number, type?: string) {
    switch (type) {
      default: {
        // console.log(this.styles, this.styles[id]);
        return this.styles[id];
      }
    }
  }

  education = [
    'Completed B.Tech(CS) in 2018 from IIIT(RGUKT) Nuzvid.'
  ].map((text, i) => ({ text, id: i + 1, bold: i === 0 }));


  gotoLink = (link: any, target = '_blank') => {
    if (target === '_self') {
      return this.router.navigate(link);
    }
    return window.open(link, target);
  }

  snake() {
    let result = [];
    let counter = 0;
    const styles = Array(this.experiences.length).fill(1).map((e, i) => i);
    // let nextPosition = 0;
    for (let num of styles) {
      counter += 1;
      counter = counter % 2;
      let row = Math.floor(num / 2);
      // console.log(counter, row, num, );
      const id = (counter + row) % 2;
      result.push(id === 1 ? 'bg-white' : 'bg-black');
    }
    return result;
  }

}
