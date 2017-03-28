import {Injectable} from '@angular/core';
import {Http,Headers,Response,RequestOptions} from "@angular/http";
import {Hero} from "./hero";
import {HEROES} from './mock.hero';

@Injectable()
export class HeroService{
    header:Headers;
    constructor(private http:Http){

    }
    getHeroes():Promise<Hero[]>{
        return Promise.resolve(HEROES);
    }
    
    getHero(id:number):Promise<Hero>{
        return this.getHeroes().then(heroes=>heroes.find(hero=>hero.id===id))
    }

    login(){
        var params={
            id:(new Date()).getTime(),
            params:{
                db:"quilqaxdb3",
                login:"daniel.moreno@quilqax.com",
                password:"Pumpfiesta_18"
            }
        }
        var headers=[
            {"Content-Type": "application/json"},
            {"Content-Length":JSON.stringify(params).length}
        ]
        var headers2={
            "Content-Type": "application/json",
            "Content-Length":JSON.stringify(params).length
        }
    this.http.post("http://localhost:8069/web/session/authenticate",params,new Headers(headers)).toPromise()
        .then((res:any)=>{
            console.log(res);
            var res=JSON.parse(res._body)
            var params={
                id:(new Date()).getTime(),
                jsonrpc: "2.0",
                method: "call",
                params:{
                    model:"quilqax.productodestacado",
                    method:"search_read",
                    args:{},
                    kwargs:{
                        limit:5,
                        domain:[['id', '>', '0' ]],
                        fields: [ 'producto_id' ],
                    },
                    context:res.result.user_context,
                },
                session_id: res.result.session_id

            };
            console.log(params);
            var headers=[
                {"uid":res.result.uid},
                {"host":"localhost"},
                {"port":8069},
                {"Content-Type": "application/json"},
                {"session_id": res.result.session_id},
                {"sid": res.result.session_id},
                {"Cookie": "session_id="+res.result.session_id+";"},
                {"Content-Length":JSON.stringify(params).length},
                {"Access-Control-Allow-Origin":"*"},
                {"Accept": "application/json"}
            ];
            var headers2={
                uid:res.result.uid,
                host:"localhost",
                port:8069,
                path:"/web/dataset/call_kw",
                method:"POST",
                "Content-Type": "application/json",
                session_id: res.result.session_id,
                token: res.result.session_id,
                CID: res.result.session_id,
                Cookie: "session_id="+res.result.session_id,
                "Content-Length":JSON.stringify(params).length,
                "Access-Control-Allow-Origin":"*",
                Accept: "application/json",
            };
             var options = {
                hostname: "localhost",
                port: 8069,
                path: "/web/dataset/call_kw",
                method: 'POST',
                headers: headers
            };
            console.log(headers2);
            /*
            var req = this.http.request("http://localhost:8069/web/dataset/call_kw",
            new RequestOptions({method:"POST",headers:new Headers(headers),body:params,url:"http://localhost:8069/web/dataset/call_kw",responseType:1,withCredentials:true})).toPromise()
            .then((res:any)=>console.log(res))
            */
            this.http.post("http://localhost:8069/web/dataset/call_kw",params,headers2).toPromise().then((res:any)=>console.log(res));

           
        })
        .catch((err:any)=>console.log(err));
    }

}