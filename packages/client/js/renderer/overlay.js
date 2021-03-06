import log from '../lib/log';

export default class Overlay {
    constructor(game) {
        var self = this;

        self.game = game;

        self.overlays = {};
        self.currentOverlay = null;

        self.load();
    }

    load() {
        var self = this;

        self.overlays['fog.png'] = self.loadOverlay('fog.png');
    }

    loadOverlay(overlayName) {
        var self = this,
            overlay = new Image();

        overlay.crossOrigin = 'Anonymous';
        overlay.src = 'img/overlays/' + overlayName;

        overlay.onload = function () {
            if (self.game.isDebug()) log.info('Loaded ' + overlayName);
        };

        return overlay;
    }

    updateOverlay(overlay) {
        var self = this;

        if (overlay in self.overlays)
            self.currentOverlay = self.overlays[overlay];
        else self.currentOverlay = overlay;
    }

    getFog() {
        return this.currentOverlay;
    }
}
