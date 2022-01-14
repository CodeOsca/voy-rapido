import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/tienda/shared/interfaces/user.interface';
import { SwiperOptions } from 'swiper';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss', '../../pages/home/clientes.scss'],
})
export class SwiperComponent implements OnInit {
  API = environment.API;
  comments: User[] = [];
  verErrorComments: boolean = false;
  loaderComments: boolean = true;
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    breakpoints: {
      280: {
        slidesPerView: 1,
      },
      680: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    loop: true,
    centeredSlides: true,
    effect: 'coverflow',
    autoplay: true,
  };
  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.loaderComments = true;
    this.commentsService.getAll().subscribe(
      (comments) => {
        this.comments = comments;
        this.loaderComments = false;
      },
      (error) => {
        this.verErrorComments = true;
        this.loaderComments = false;
      }
    );
  }
}
