import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/guard/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    name: string = '';
    password: string = '';
    constructor(public router: Router,
    			public auth: AuthService) {}

    ngOnInit() {}

    onLoggedin() {
        this.auth.login(this.name, this.password).subscribe(resp => {
            console.log(resp);
        })
        localStorage.setItem('isLoggedin', 'true');
    }
}
