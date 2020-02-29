import {NgModule, Optional, SkipSelf} from '@angular/core';
import {MaterialModule} from './material.module';
import {MapComponent} from './map/map.component';
import {SearchComponent} from './search/search.component';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
    declarations: [
        MapComponent,
        SearchComponent,
        SlideshowComponent
    ],
    imports: [
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        GoogleMapsModule
    ],
    exports: [
        FormsModule,
        MapComponent,
        SearchComponent,
        SlideshowComponent,
        MaterialModule,
        FlexLayoutModule,
        GoogleMapsModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error('Core Module has already been loaded within the AppModule. Please only import it there.');
        }
    }
}
