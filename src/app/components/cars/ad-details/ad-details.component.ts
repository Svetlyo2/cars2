import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {Ad} from '../../../core/models/ad';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  ad: Ad;

  constructor(private adService: AdService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const id = data['id'];
      // console.log(id);
      this.adService.getAd(id)
        .subscribe((d) => {
          this.ad = d;
        });
      // console.log(this.ad);
    });
  }

  deleteAd(id: string) {
    this.adService.deleteAdById(id);
  }
}
