import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  serverId:number;
  allowEditing = false;

  constructor(private serversService: ServersService,
            private router:Router,
            private route:ActivatedRoute) { }

  ngOnInit() {  
    this.serverId =  Number(this.route.snapshot.params.id);
    this.server = this.serversService.getServer(this.serverId);
 
    
    
    this.route.queryParams.subscribe(
        queryParams=>{
            console.log(queryParams );
             this.allowEditing = queryParams['allowEditing'] === "1" ? true :  false;
        })

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }
  
  onServerReload(){
    this.router.navigate(['/servers', 1, 'edit'], {
        queryParams:{
            allowEditing:1
        },
        fragment:"azSumFragment"
    })
  }
}
