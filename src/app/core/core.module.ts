import {NgModule, Optional, SkipSelf} from '@angular/core';
import {MaterialModule} from './material.module';
import {MapComponent} from './map/map.component';
import {SearchComponent} from './search/search.component';
import {SlideshowComponent} from './slideshow/slideshow.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {GoogleMapsModule} from '@angular/google-maps';
import {LocalStorageService} from './local-storage/local-storage.service';
import {FlickrGateway} from './flickr/flickr.gateway';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbacusLoaderModule} from './loader/loader.module';
import {MatDividerModule} from '@angular/material/divider';

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
        GoogleMapsModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        AbacusLoaderModule
    ],
    exports: [
        FormsModule,
        MapComponent,
        SearchComponent,
        SlideshowComponent,
        MaterialModule,
        FlexLayoutModule,
        GoogleMapsModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        AbacusLoaderModule
    ],
    providers: [
        LocalStorageService,
        FlickrGateway
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error('Core Module has already been loaded within the AppModule. Please only import it there.');
        }
    }
}
