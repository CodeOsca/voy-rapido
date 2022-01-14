import { Days } from './enums/days.enum';
import { Commune, CommuneDocument } from './communes.schema';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommunesSeeder {
  constructor(@InjectModel(Commune.name) private commune: Model<CommuneDocument>) {}

  @Command({
    command: 'create:communes',
    describe: 'create communes',
    autoExit: true,
  })
  async create() {
    const communes = await this.commune.insertMany([
      {
        name: 'Calera De Tango',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.62629628833799',
          longitude: '-70.78742108502678',
        },
      },
      {
        name: 'Cerrillos',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.50070835681216',
          longitude: '-70.71155531192248',
        },
      },
      {
        name: 'Cerro Navia',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.4207167332163',
          longitude: '-70.74977583684577',
        },
      },
      {
        name: 'Chicureo',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.26968881264454',
          longitude: '-70.67858628789286',
        },
      },
      {
        name: 'Colina',
        price: 6000,
        priceWithIVA: 7140,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.20435045218163',
          longitude: '-70.6766940165725',
        },
      },
      {
        name: 'Conchalí',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.38165929862113',
          longitude: '-70.67555833368193',
        },
      },
      {
        name: 'El Bosque',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.55915683275698',
          longitude: '-70.6821698701642',
        },
      },
      {
        name: 'Estación Central',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.46477192469009',
          longitude: '-70.70482910486365',
        },
      },
      {
        name: 'Huechuraba',
        price: 4000,
        priceWithIVA: 4760,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.374432360235',
          longitude: '-70.63800092560629',
        },
      },
      {
        name: 'Independencia',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.41356623320102',
          longitude: '-70.66551773138798',
        },
      },
      {
        name: 'La Cisterna',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.53629557091432',
          longitude: '-70.66262251997239',
        },
      },
      {
        name: 'La Florida',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.52818783886505',
          longitude: '-70.57626627523076',
        },
      },
      {
        name: 'La Granja',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.53474672093084',
          longitude: '-70.62209697118418',
        },
      },
      {
        name: 'La Pintana',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.58067987263319',
          longitude: '-70.6319045131318',
        },
      },
      {
        name: 'La Reina',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.44582271450573',
          longitude: '-70.54539580249404',
        },
      },
      {
        name: 'Lampa - Valle Grande',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.32469356823901',
          longitude: '-70.74657844925615',
        },
      },
      {
        name: 'Lampa - Chicauma',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.24023913543819',
          longitude: '-70.91227657235258',
        },
      },
      {
        name: 'Las Condes',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.39982719881947',
          longitude: '-70.5271589135044',
        },
      },
      {
        name: 'Lo Barnechea',
        price: 4000,
        priceWithIVA: 4760,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.345139931809115',
          longitude: '-70.522240319095',
        },
      },
      {
        name: 'Lo Espejo',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.51772607929894',
          longitude: '-70.68906542161535',
        },
      },
      {
        name: 'Lo Prado',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.44590650099823',
          longitude: '-70.72281035471771',
        },
      },
      {
        name: 'Macul',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.48526728815318',
          longitude: '-70.59988524224164',
        },
      },
      {
        name: 'Maipu',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.49644674102933',
          longitude: '-70.80653661462861',
        },
      },
      {
        name: 'Nuñoa',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.45938744213513',
          longitude: '-70.59746314621555',
        },
      },
      {
        name: 'Padre Hurtado',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.569390837995435',
          longitude: '-70.81571664296378',
        },
      },
      {
        name: 'Pedro Aguirre Cerda',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.48930327268707',
          longitude: '-70.67096271643331',
        },
      },
      {
        name: 'Peñaflor',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.60377659988529',
          longitude: '-70.88006271704454',
        },
      },
      {
        name: 'Peñalolen',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.48342984147756',
          longitude: '-70.52545961313672',
        },
      },
      {
        name: 'Providencia',
        price: 3000,
        priceWithIVA: 3750,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.43249115623052',
          longitude: '-70.61062090210368',
        },
      },
      {
        name: 'Pudahuel',
        price: 4000,
        priceWithIVA: 4760,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.4245508303611',
          longitude: '-70.85025270087237',
        },
      },
      {
        name: 'Pudahuel - Ciudad De Los Valles',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.450274984391015',
          longitude: '-70.84399827219649',
        },
      },
      {
        name: 'Puente Alto',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.618355067391775',
          longitude: '-70.60023527096858',
        },
      },
      {
        name: 'Provincia De Isla De Maipo',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.74621679004802',
          longitude: '-70.90255590163265',
        },
      },
      {
        name: 'Quilicura',
        price: 4000,
        priceWithIVA: 4760,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.35808112672022',
          longitude: '-70.72944823837474',
        },
      },
      {
        name: 'Quinta Normal',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.428350994951714',
          longitude: '-70.69898712403297',
        },
      },
      {
        name: 'Recoleta',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.40402266458712',
          longitude: '-70.63890351033963',
        },
      },
      {
        name: 'Renca',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.40166102191719',
          longitude: '-70.72887139209575',
        },
      },
      {
        name: 'San Bernardo',
        price: 4000,
        priceWithIVA: 4760,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.585218621400834',
          longitude: '-70.6956766065852',
        },
      },
      {
        name: 'San Joaquin',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.49588317531567',
          longitude: '-70.63282247370731',
        },
      },
      {
        name: 'San Miguel',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.49473724444679',
          longitude: '-70.65243806095442',
        },
      },
      {
        name: 'San Ramón',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.534681221089414',
          longitude: '-70.64453660195798',
        },
      },
      {
        name: 'Santiago Centro',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.454903039376376',
          longitude: '-70.67332674791321',
        },
      },
      {
        name: 'Talagante',
        price: 5000,
        priceWithIVA: 5950,
        status: true,
        retirementDates: [Days.WEDNESDAY, Days.THURSDAY, Days.SATURDAY],
        coordinates: {
          latitude: '-33.66569964877189',
          longitude: '-70.92506245838739',
        },
      },
      {
        name: 'Vitacura',
        price: 3000,
        priceWithIVA: 3570,
        status: true,
        retirementDates: [Days.MondaytoFriday],
        coordinates: {
          latitude: '-33.38761559038571',
          longitude: '-70.5680204879395',
        },
      },
    ]);
    console.log(communes);
  }
}
