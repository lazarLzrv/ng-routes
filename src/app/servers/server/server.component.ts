import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverId:number;
  constructor(private serversService: ServersService,
                private route:ActivatedRoute,
                private router:Router) { 
                    
                }
 
  ngOnInit() {   
        
    this.serverId = Number(this.route.snapshot.params['id'])  
    console.log(this.serverId);
    
    this.server = this.serversService.getServer(this.serverId); 
    this.route.params.subscribe(
        params =>{
            console.log(params.id);
            
            this.server = this.serversService.getServer(Number(params.id)); 
        }
    )
  }
  onEditServer(){
      this.router.navigate(['edit'], {
          relativeTo:this.route,
          queryParamsHandling:'preserve'
      })
  }
}
