System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'libs/'
  },
  //map tells the System loader where to look for things

  // !!!!!! Add task libs in gulpfile.ts !!!!!!!!!
  map: {
    'app': 'app',

    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.min.js',
    '@angular/animations/browser':'npm:@angular/animations/bundles/animations-browser.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
    
    // other libraries
    'ng2-translate': 'npm:ng2-translate/bundles/ng2-translate.umd.js',
    'rxjs': 'npm:rxjs',
    'typescript': 'npm:typescript',
    'primeng': 'npm:primeng'
  },
  // !!!!!! Add task libs in gulpfile.ts !!!!!!!!!
  
  //packages defines our app package
  packages: {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    },
    'ng2-translate': {
      defaultExtension: 'js'
    },
    'primeng': {
      defaultExtension: 'js'
    }
  }
});