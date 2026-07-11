(function () {
    var script = {
        "mouseWheelEnabled": true,
        "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_86908ADB_A654_E5BE_41A3_79336C766479.set('selectedIndex', 0); this.playList_86909ADB_A654_E5BE_41D4_7CDB4B21A056.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
        "scrollBarWidth": 10,
        "id": "rootPlayer",
        "mobileMipmappingEnabled": false,
        "vrPolyfillScale": 1,
        "propagateClick": false,
        "paddingLeft": 0,
        "scrollBarColor": "#000000",
        "paddingRight": 0,
        "backgroundPreloadEnabled": true,
        "children": [
            "this.MainViewer",
            "this.Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
            "this.Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
            "this.Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
            "this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
            "this.veilPopupPanorama",
            "this.zoomImagePopupPanorama",
            "this.closeButtonPopupPanorama"
        ],
        "borderSize": 0,
        "scrollBarVisible": "rollOver",
        "desktopMipmappingEnabled": false,
        "minHeight": 20,
        "scripts": {
            "getMediaByName": function (name) { var list = this.getByClassName('Media'); for (var i = 0, count = list.length; i < count; ++i) { var media = list[i]; if ((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name) { return media; } } return undefined; },
            "setCameraSameSpotAsMedia": function (camera, media) { var player = this.getCurrentPlayerWithMedia(media); if (player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
            "showPopupImage": function (image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback) { var self = this; var closed = false; var playerClickFunction = function () { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function () { zoomImage.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var resizeFunction = function () { setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function () { self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function () { timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if (toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if (loadedCallback) loadedCallback(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); closed = true; if (timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if (autoCloseMilliSeconds) clearAutoClose(); if (hideCallback) hideCallback(); zoomImage.set('visible', false); if (hideEffect && hideEffect.get('duration') > 0) { hideEffect.bind('end', endEffectFunction, this); } else { zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if (toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function () { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function () { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function () { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function () { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if (right < 10) right = 10; if (top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function () { if (timeoutUserInteractionID) { clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else { closeButton.set('visible', false); } }; var userInteractionEndFunction = function () { if (!closed) { timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function () { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function () { self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
            "openLink": function (url, name) { if (url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if (extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if (isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
            "loadFromCurrentMediaPlayList": function (playList, delta) { var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while (newIndex < 0) { newIndex = totalItems + newIndex; }; if (currentIndex != newIndex) { playList.set('selectedIndex', newIndex); } },
            "executeFunctionWhenChange": function (playList, index, endFunction, changeFunction) { var endObject = undefined; var changePlayListFunction = function (event) { if (event.data.previousSelectedIndex == index) { if (changeFunction) changeFunction.call(this); if (endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if (endFunction) { var playListItem = playList.get('items')[index]; if (playListItem.get('class') == 'PanoramaPlayListItem') { var camera = playListItem.get('camera'); if (camera != undefined) endObject = camera.get('initialSequence'); if (endObject == undefined) endObject = camera.get('idleSequence'); } else { endObject = playListItem.get('media'); } if (endObject) { endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
            "stopGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; if (audio) { delete audios[audio.get('id')]; if (Object.keys(audios).length == 0) { window.currentGlobalAudios = undefined; } } } if (audio) audio.stop(); },
            "getGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios != undefined && audio.get('id') in audios) { audio = audios[audio.get('id')]; } return audio; },
            "showPopupMedia": function (w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios) { var self = this; var closeFunction = function () { playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if (stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if (isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function () { w.hide(); }; var resizeFunction = function () { var getWinValue = function (property) { return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if (!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if (parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if (windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if (windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if (autoCloseWhenFinished) { this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if (isVideo) { this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if (stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
            "getActivePlayerWithViewer": function (viewerArea) { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if (playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if ((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if (playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if (playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
            "showComponentsWhileMouseOver": function (parentComponent, components, durationVisibleWhileOut) { var setVisibility = function (visible) { for (var i = 0, length = components.length; i < length; i++) { var component = components[i]; if (component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true) { setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function () { setVisibility(true); if (timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function () { var timeoutFunction = function () { setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
            "getComponentByName": function (name) { var list = this.getByClassName('UIComponent'); for (var i = 0, count = list.length; i < count; ++i) { var component = list[i]; var data = component.get('data'); if (data != undefined && data.name == name) { return component; } } return undefined; },
            "shareTwitter": function (url) { window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
            "resumeGlobalAudios": function (caller) { if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length - 1; j >= 0; --j) { var a = audiosPaused[j]; if (objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i < count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
            "triggerOverlay": function (overlay, eventName) { if (overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for (var i = 0; i < areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
            "resumePlayers": function (players, onlyResumeCameraIfPanorama) { for (var i = 0; i < players.length; ++i) { var player = players[i]; if (onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.resumeCamera(); } else { player.play(); } } },
            "syncPlaylists": function (playLists) { var changeToMedia = function (media, playListDispatched) { for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (playList != playListDispatched) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { if (items[j].get('media') == media) { if (playList.get('selectedIndex') != j) { playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function (event) { var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if (selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function (event) { var panoramaMapLocation = event.source.get('panoramaMapLocation'); if (panoramaMapLocation) { var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for (var i = 0, count = playLists.length; i < count; ++i) { playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for (var i = 0, count = mapPlayers.length; i < count; ++i) { mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
            "isCardboardViewMode": function () { var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
            "unregisterKey": function (key) { delete window[key]; },
            "registerKey": function (key, value) { window[key] = value; },
            "fixTogglePlayPauseButton": function (player) { var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if (typeof buttons !== 'undefined' && player.get('state') == 'playing') { if (!Array.isArray(buttons)) buttons = [buttons]; for (var i = 0; i < buttons.length; ++i) buttons[i].set('pressed', true); } },
            "playGlobalAudio": function (audio, endCallback) { var endFunction = function () { audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if (endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if (!audios) { audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if (audio.get('state') == 'playing') { return audio; } if (!audio.get('loop')) { audio.bind('end', endFunction, this); } audio.play(); return audio; },
            "setEndToItemIndex": function (playList, fromIndex, toIndex) { var endFunction = function () { if (playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
            "stopAndGoCamera": function (camera, ms) { var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function () { sequence.play(); }; setTimeout(timeoutFunction, ms); },
            "playGlobalAudioWhilePlay": function (playList, index, audio, endCallback) { var changeFunction = function (event) { if (event.data.previousSelectedIndex == index) { this.stopGlobalAudio(audio); if (isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if (endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if (audios && audio.get('id') in audios) { audio = audios[audio.get('id')]; if (audio.get('state') != 'playing') { audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if (isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if (audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for (var i = 0; i < stateChangeFunctions.length; ++i) { var f = stateChangeFunctions[i]; if (typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
            "startPanoramaWithCamera": function (media, camera) { if (window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1) { return; } var playLists = this.getByClassName('PlayList'); if (playLists.length == 0) return; var restoreItems = []; for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')) { restoreItems.push({ camera: item.get('camera'), item: item }); item.set('camera', camera); } } } if (restoreItems.length > 0) { if (window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function () { var index = window.currentPanoramasWithCameraChanged.indexOf(media); if (index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
            "loopAlbum": function (playList, index) { var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function () { player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
            "shareWhatsapp": function (url) { window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
            "getPixels": function (value) { var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch (unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
            "setComponentVisibility": function (component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout) { var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if (keepVisibility) return; this.unregisterKey('visibility_' + component.get('id')); var changeVisibility = function () { if (effect && propertyEffect) { component.set(propertyEffect, effect); } component.set('visible', visible); if (component.get('class') == 'ViewerArea') { try { if (visible) component.restart(); else if (component.get('playbackState') == 'playing') component.pause(); } catch (e) { }; } }; var effectTimeoutName = 'effectTimeout_' + component.get('id'); if (!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)) { var effectTimeout = window[effectTimeoutName]; if (effectTimeout instanceof Array) { for (var i = 0; i < effectTimeout.length; i++) { clearTimeout(effectTimeout[i]) } } else { clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if (visible == component.get('visible') && !ignoreClearTimeout) return; if (applyAt && applyAt > 0) { var effectTimeout = setTimeout(function () { if (window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if (arrayTimeoutVal.length == 0) { delete window[effectTimeoutName]; } } else { delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if (window.hasOwnProperty(effectTimeoutName)) { window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; } else { window[effectTimeoutName] = effectTimeout; } } else { changeVisibility(); } },
            "showWindow": function (w, autoCloseMilliSeconds, containsAudio) { if (w.get('visible') == true) { return; } var closeFunction = function () { clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function () { w.unbind('click', clearAutoClose, this); if (timeoutID != undefined) { clearTimeout(timeoutID); } }; var timeoutID = undefined; if (autoCloseMilliSeconds) { var autoCloseFunction = function () { w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
            "keepComponentVisibility": function (component, keep) { var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if (value == undefined && keep) { this.registerKey(key, keep); } else if (value != undefined && !keep) { this.unregisterKey(key); } },
            "shareFacebook": function (url) { window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
            "init": function () { if (!Object.hasOwnProperty('values')) { Object.values = function (o) { return Object.keys(o).map(function (e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function (e) { var playList = e.source; var index = playList.get('selectedIndex'); if (index < 0) return; var id = playList.get('id'); if (!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
            "pauseCurrentPlayers": function (onlyPauseCameraIfPanorama) { var players = this.getCurrentPlayers(); var i = players.length; while (i-- > 0) { var player = players[i]; if (player.get('state') == 'playing') { if (onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined') { player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
            "getPanoramaOverlayByName": function (panorama, name) { var overlays = this.getOverlays(panorama); for (var i = 0, count = overlays.length; i < count; ++i) { var overlay = overlays[i]; var data = overlay.get('data'); if (data != undefined && data.label == name) { return overlay; } } return undefined; },
            "pauseGlobalAudios": function (caller, exclude) { if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i < count; ++i) { var objAudios = values[i]; for (var j = 0; j < objAudios.length; ++j) { var a = objAudios[j]; if (audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
            "setStartTimeVideoSync": function (video, player) { this.setStartTimeVideo(video, player.get('currentTime')); },
            "getPlayListItems": function (media, player) { var itemClass = (function () { switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length - 1; i >= 0; --i) { var item = items[i]; if (item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
            "updateMediaLabelFromPlayList": function (playList, htmlText, playListItemStopToDispose) { var changeFunction = function () { var index = playList.get('selectedIndex'); if (index >= 0) { var beginFunction = function () { playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function (index) { var media = playListItem.get('media'); var text = media.get('data'); if (!text) text = media.get('label'); setHtml(text); }; var setHtml = function (text) { if (text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if (htmlText.get('html')) { setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else { setMediaLabel(index); } } }; var disposeFunction = function () { htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if (playListItemStopToDispose) { playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
            "showPopupPanoramaVideoOverlay": function (popupPanoramaOverlay, closeButtonProperties, stopAudios) { var self = this; var showEndFunction = function () { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function () { if (!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function () { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if (stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function () { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if (closeButtonProperties) { for (var key in closeButtonProperties) { closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if (stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
            "existsKey": function (key) { return key in window; },
            "setStartTimeVideo": function (video, time) { var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function () { for (var i = 0; i < items.length; ++i) { var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for (var i = 0; i < items.length; ++i) { var item = items[i]; var player = item.get('player'); if (player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
            "playAudioList": function (audios) { if (audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function () { if (++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
            "setMapLocation": function (panoramaPlayListItem, mapPlayer) { var resetFunction = function () { panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
            "setPanoramaCameraWithSpot": function (playListItem, yaw, pitch) { var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
            "getCurrentPlayers": function () { var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
            "getOverlays": function (media) { switch (media.get('class')) { case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for (var j = 0; j < frames.length; ++j) { overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
            "getMediaHeight": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxH = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('height') > maxH) maxH = r.get('height'); } return maxH; } else { return r.get('height') } default: return media.get('height'); } },
            "getCurrentPlayerWithMedia": function (media) { var playerClass = undefined; var mediaPropertyName = undefined; switch (media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if (playerClass != undefined) { var players = this.getByClassName(playerClass); for (var i = 0; i < players.length; ++i) { var player = players[i]; if (player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
            "historyGoBack": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.back(); } },
            "setPanoramaCameraWithCurrentSpot": function (playListItem) { var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer == undefined) { return; } var playerClass = currentPlayer.get('class'); if (playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player') { return; } var fromMedia = currentPlayer.get('panorama'); if (fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
            "cloneCamera": function (camera) { var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
            "getPlayListWithMedia": function (media, onlySelected) { var playLists = this.getByClassName('PlayList'); for (var i = 0, count = playLists.length; i < count; ++i) { var playList = playLists[i]; if (onlySelected && playList.get('selectedIndex') == -1) continue; if (this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
            "setOverlayBehaviour": function (overlay, media, action) { var executeFunc = function () { switch (action) { case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if (overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if (window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function () { delete window.overlaysDispatched[id]; }, 2000); }; if (window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if (playList != undefined) { var item = this.getPlayListItemByMedia(playList, media); if (playList.get('items').indexOf(item) != playList.get('selectedIndex')) { var beginFunc = function (e) { item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
            "getPlayListItemByMedia": function (playList, media) { var items = playList.get('items'); for (var j = 0, countJ = items.length; j < countJ; ++j) { var item = items[j]; if (item.get('media') == media) return item; } return undefined; },
            "initGA": function () { var sendFunc = function (category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for (var i = 0, countI = media.length; i < countI; ++i) { var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for (var j = 0, countJ = overlays.length; j < countJ; ++j) { var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch (overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z < areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for (var i = 0, countI = components.length; i < countI; ++i) { var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for (var i = 0, countI = items.length; i < countI; ++i) { var item = items[i]; var media = item.get('media'); if (!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
            "changeBackgroundWhilePlay": function (playList, index, color) { var stopFunction = function (event) { playListItem.unbind('stop', stopFunction, this); if ((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))) { viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if ((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)) { viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
            "visibleComponentsIfPlayerFlagEnabled": function (components, playerFlag) { var enabled = this.get(playerFlag); for (var i in components) { components[i].set('visible', enabled); } },
            "setMediaBehaviour": function (playList, index, mediaDispatcher) { var self = this; var stateChangeFunction = function (event) { if (event.data.state == 'stopped') { dispose.call(this, true); } }; var onBeginFunction = function () { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if (media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)) { player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function () { var index = playListDispatcher.get('selectedIndex'); if (index != -1) { indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function () { dispose.call(this, false); }; var dispose = function (forceDispose) { if (!playListDispatcher) return; var media = item.get('media'); if ((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if (panoramaSequence && panoramaSequenceIndex != -1) { if (panoramaSequence) { if (panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex - 1].get('class') == 'TargetPanoramaCameraMovement') { var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex - 1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function (event) { initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if (player) { item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for (var i = 0; i < buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if (sameViewerArea) { var currentMedia = this.getMediaFromPlayer(player); if (currentMedia == undefined || currentMedia == item.get('media')) { playListDispatcher.set('selectedIndex', indexDispatcher); } if (playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else { viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if (!mediaDispatcher) { var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if (currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if (!playListDispatcher) { playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if (playList.get('selectedIndex') == index || indexDispatcher == -1) { return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if (sameViewerArea) { if (playList != playListDispatcher) { playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else { viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if (camera) { panoramaSequence = camera.get('initialSequence'); if (panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function (property) { var value = player.get(property); if (value == undefined) return; if (Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for (var i = 0; i < buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if (player != itemDispatcher.get('player') || !mediaDispatcherByParam) { item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
            "getMediaFromPlayer": function (player) { switch (player.get('class')) { case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
            "pauseGlobalAudio": function (audio) { var audios = window.currentGlobalAudios; if (audios) { audio = audios[audio.get('id')]; } if (audio.get('state') == 'playing') audio.pause(); },
            "autotriggerAtStart": function (playList, callback, once) { var onChange = function (event) { callback(); if (once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
            "updateVideoCues": function (playList, index) { var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if (video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function () { if (playList.get('selectedIndex') != index) { video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function (event) { var activeCues = event.data.activeCues; for (var i = 0, count = cues.length; i < count; ++i) { var cue = cues[i]; if (activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime') + 0.5)) { cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
            "showPopupPanoramaOverlay": function (popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio) { var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if (!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function () { var loadedFunction = function () { if (!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function () { var restoreShowDurationFunction = function () { popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if (popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if (!imageHD) { imageHD = popupPanoramaOverlay.get('image'); } if (!toggleImageHD && toggleImage) { toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function () { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if (audio) { if (stopBackgroundAudio) { this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
            "pauseGlobalAudiosWhilePlayItem": function (playList, index, exclude) { var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function () { if (playList.get('selectedIndex') != index) { if (hasState) { player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function (event) { var state = event.data.state; if (state == 'stopped') { this.resumeGlobalAudios(caller); } else if (state == 'playing') { this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if (hasState) { player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
            "setMainMediaByName": function (name) { var items = this.mainPlayList.get('items'); for (var i = 0; i < items.length; ++i) { var item = items[i]; if (item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
            "changePlayListWithSameSpot": function (playList, newIndex) { var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
            "historyGoForward": function (playList) { var history = this.get('data')['history'][playList.get('id')]; if (history != undefined) { history.forward(); } },
            "setMainMediaByIndex": function (index) { var item = undefined; if (index >= 0 && index < this.mainPlayList.get('items').length) { this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
            "getMediaWidth": function (media) { switch (media.get('class')) { case 'Video360': var res = media.get('video'); if (res instanceof Array) { var maxW = 0; for (var i = 0; i < res.length; i++) { var r = res[i]; if (r.get('width') > maxW) maxW = r.get('width'); } return maxW; } else { return r.get('width') } default: return media.get('width'); } },
            "getKey": function (key) { return window[key]; }
        },
        "verticalAlign": "top",
        "scrollBarOpacity": 0.5,
        "buttonToggleFullscreen": "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
        "scrollBarMargin": 2,
        "contentOpaque": false,
        "minWidth": 20,
        "defaultVRPointer": "laser",
        "horizontalAlign": "left",
        "downloadEnabled": false,
        "gap": 10,
        "layout": "absolute",
        "height": "100%",
        "paddingTop": 0,
        "shadow": false,
        "paddingBottom": 0,
        "borderRadius": 0,
        "class": "Player",
        "data": {
            "name": "Player1268"
        },
        "overflow": "visible",
        "definitions": [{
            "class": "FadeInEffect",
            "duration": 500,
            "id": "FadeInEffect_BA8C448A_A654_ED9E_41E4_31A208D0F3DF",
            "easing": "cubic_in"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 8.99,
            "id": "popup_8307940D_A465_DD2C_41DE_C1051616BA75",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_8307940D_A465_DD2C_41DE_C1051616BA75_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 670
                    }
                ]
            },
            "pitch": 8.45,
            "yaw": -128.03,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 102.02,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "camera_86E5EAF5_A654_E58A_419E_7C747EA4662B"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_BA8C948A_A654_ED9E_41C0_310751FFD7BD",
            "levels": [
                {
                    "url": "media/panduan_baru.png",
                    "width": 1024,
                    "class": "ImageResourceLevel",
                    "height": 585
                }
            ]
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_8690AADB_A654_E5BE_41CE_D61F2827DFB9, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_8690AADB_A654_E5BE_41CE_D61F2827DFB9, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "media": "this.video_228A4601_3F36_E563_41B1_730E2DA2CD31",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_8690AADB_A654_E5BE_41CE_D61F2827DFB9"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 0,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_camera"
        },
        {
            "class": "PlayList",
            "items": [
                "this.PanoramaPlayListItem_8691FADC_A654_E5BA_419A_5148DEA9CAB8",
                "this.PanoramaPlayListItem_86917ADC_A654_E5BA_41D4_FB360568B056",
                "this.PanoramaPlayListItem_86913ADC_A654_E5BA_41D9_D1D066E41D3B"
            ],
            "id": "mainPlayList"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 0,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "panorama_0B945D70_13B8_5441_41AB_71247990FC35_camera"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 167.06,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "camera_86F4DB09_A654_E49A_41E0_C658D20B8AB3"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -85.94,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "camera_86E6CAEB_A654_E59E_41D7_73560B94D78B"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "class": "MapPlayListItem",
                    "media": "this.map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
                    "player": "this.MapViewerMapPlayer"
                }
            ],
            "id": "playList_8690EADB_A654_E5BE_41E3_D1095EED635D"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_89BE3666_A464_DD1C_41E1_02CD7662BFBF",
            "levels": [
                {
                    "url": "media/popup_8CD133A0_A464_5B13_41D0_1766E3397665_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 980,
                    "height": 1128
                },
                {
                    "url": "media/popup_8CD133A0_A464_5B13_41D0_1766E3397665_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 889,
                    "height": 1024
                },
                {
                    "url": "media/popup_8CD133A0_A464_5B13_41D0_1766E3397665_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 444,
                    "height": 512
                }
            ]
        },
        {
            "class": "MapPlayer",
            "viewerArea": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
            "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
            "movementMode": "constrained"
        },
        {
            "class": "Video",
            "label": "Virtual Reality (1)",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_228A4601_3F36_E563_41B1_730E2DA2CD31_t.jpg",
            "width": 2240,
            "loop": false,
            "id": "video_228A4601_3F36_E563_41B1_730E2DA2CD31",
            "height": 2240,
            "video": {
                "width": 2240,
                "class": "VideoResource",
                "height": 2240,
                "mp4Url": "media/video_228A4601_3F36_E563_41B1_730E2DA2CD31.mp4"
            }
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 169.14,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "camera_86EDDAFF_A654_E576_41E1_4F3DBF4B51B5"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_0165C931_2ADC_10E9_4135_B5B237DBFEB4",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_8690BADB_A654_E5BE_41E3_AD4F9500DF38"
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "Lantai 2 - Copy",
            "id": "map_0165C931_2ADC_10E9_4135_B5B237DBFEB4",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_t.png",
            "width": 2500,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4.png",
                        "class": "ImageResourceLevel",
                        "width": 2500,
                        "height": 1667
                    },
                    {
                        "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_lq.png",
                        "class": "ImageResourceLevel",
                        "width": 313,
                        "height": 209,
                        "tags": "preload"
                    }
                ]
            },
            "fieldOfViewOverlayRadiusScale": 0.3,
            "fieldOfViewOverlayOutsideColor": "#000000",
            "maximumZoomFactor": 1.2,
            "class": "Map",
            "fieldOfViewOverlayInsideOpacity": 0.4,
            "scaleMode": "fit_inside",
            "initialZoomFactor": 1,
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "height": 1667,
            "overlays": [
                "this.overlay_0477A708_2ADC_10A7_4174_B8A05688A5E0",
                "this.overlay_01753244_2ADC_10AF_4163_92D4A0256A0B",
                "this.overlay_0403C929_2ADD_F0F9_4198_8CE81E121CCC"
            ]
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_0165C931_2ADC_10E9_4135_B5B237DBFEB4",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_86909ADB_A654_E5BE_41D4_7CDB4B21A056"
        },
        {
            "class": "PanoramaPlayer",
            "buttonCardboardView": "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
            "buttonToggleHotspots": "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
            "viewerArea": "this.MainViewer",
            "touchControlMode": "drag_acceleration",
            "id": "MainViewerPanoramaPlayer",
            "gyroscopeVerticalDraggingEnabled": true,
            "displayPlaybackBar": true,
            "buttonToggleGyroscope": "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
            "mouseControlMode": "drag_acceleration"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "class": "MapPlayListItem",
                    "media": "this.map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
                    "player": "this.MapViewerMapPlayer"
                }
            ],
            "id": "playList_86908ADB_A654_E5BE_41A3_79336C766479"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 9.61,
            "id": "popup_8CD133A0_A464_5B13_41D0_1766E3397665",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_8CD133A0_A464_5B13_41D0_1766E3397665_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 889,
                        "height": 1024
                    }
                ]
            },
            "pitch": -3.39,
            "yaw": -125.17,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": 94.06,
                    "backwardYaw": -10.86,
                    "distance": 1,
                    "panorama": "this.panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91"
                },
                {
                    "class": "AdjacentPanorama",
                    "yaw": -77.98,
                    "backwardYaw": -12.94,
                    "distance": 1,
                    "panorama": "this.panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D"
                }
            ],
            "hfov": 360,
            "label": "IMG_20260427_121737_00_021",
            "id": "panorama_0B945D70_13B8_5441_41AB_71247990FC35",
            "thumbnailUrl": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_t.jpg",
            "pitch": 0,
            "partial": false,
            "hfovMax": 130,
            "class": "Panorama",
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "top": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "right": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "back": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "bottom": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "left": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_t.jpg"
                }
            ],
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
                    "class": "PanoramaMapLocation",
                    "angle": 88.11,
                    "y": 1094.32,
                    "x": 692.96
                }
            ],
            "hfovMin": "150%",
            "overlays": [
                "this.overlay_0B6919D0_13B8_5C40_4187_070E8B593AB8",
                "this.overlay_8F083CD8_A373_C943_41D7_047D1F32FBA6",
                "this.overlay_8CA8EF98_A373_C7C3_41C9_1C678853FEA9",
                "this.overlay_9232CDB4_A372_4BC2_41B1_D8AC74583FCE",
                "this.overlay_BA43C2CC_A3DC_3513_41E2_61A2FA12DA05",
                "this.overlay_BADAE76A_A3DC_DB14_41D5_193B52A57784",
                "this.overlay_BEE63462_A424_5D14_41CB_003FF5095845",
                "this.overlay_BEFA76EC_A424_5D13_41D8_4CFC417D8708",
                "this.overlay_BE32F420_A424_3D14_41E1_A6D614745837",
                "this.overlay_BB41679A_A3DC_3B37_41B8_55953D2523DA",
                "this.overlay_BE1C473B_A42C_3B75_41DC_6CC34AB36F9F",
                "this.overlay_BE1C573B_A42C_3B75_41CB_FA77BC575D9A",
                "this.overlay_BE396A12_A42C_7534_41D7_4178D72E54E1",
                "this.overlay_864E1E9C_A43C_4D33_41E1_EB5352AF3D99",
                "this.overlay_8667CA28_A43C_3513_41E0_32D7C376BD09",
                "this.overlay_8CBD1C52_A45C_4D34_41C5_93E127FBE166",
                "this.overlay_83CD93A7_A464_5B1D_41E3_F7673CDC87D3",
                "this.popup_8307940D_A465_DD2C_41DE_C1051616BA75",
                "this.popup_8CD133A0_A464_5B13_41D0_1766E3397665",
                "this.overlay_868FFD3F_A654_BCF7_41E0_E0B0402A93CE"
            ]
        },
        {
            "class": "MapPlayer",
            "buttonZoomIn": "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
            "movementMode": "constrained",
            "buttonZoomOut": "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
            "viewerArea": "this.MapViewer",
            "id": "MapViewerMapPlayer"
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": -10.86,
                    "backwardYaw": 94.06,
                    "distance": 1,
                    "panorama": "this.panorama_0B945D70_13B8_5441_41AB_71247990FC35"
                }
            ],
            "hfov": 360,
            "partial": false,
            "id": "panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91",
            "thumbnailUrl": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_t.jpg",
            "label": "IMG_20260427_125005_00_041",
            "pitch": 0,
            "hfovMax": 130,
            "class": "Panorama",
            "mapLocations": [
                {
                    "map": "this.map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
                    "class": "PanoramaMapLocation",
                    "angle": 0,
                    "y": 1870.67,
                    "x": 678.72
                }
            ],
            "vfov": 180,
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/f/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "top": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/u/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "right": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/r/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "back": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/b/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "bottom": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/d/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "left": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0/l/3/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_t.jpg"
                }
            ],
            "overlays": [
                "this.overlay_0ABC4213_13B9_CFC0_41AF_ED64BE6959DE",
                "this.overlay_0A66AAFB_13C9_DC47_41AC_A108429A376C",
                "this.overlay_B54746E1_A3E4_5D14_41D6_9D6E9A454369",
                "this.overlay_B6B420E4_A3FD_F51C_41D7_79A3596CF7D3",
                "this.overlay_B4B190D1_A3E7_D534_41CB_479DE1093407",
                "this.overlay_B4385E50_A3EC_4D34_4180_365414CACAB0",
                "this.overlay_B4ECD542_A3EC_5F17_41E1_C5A1C7195E19",
                "this.overlay_B4320E64_A3E4_4D1C_41C0_8723A0748137",
                "this.overlay_B4CA64EE_A3E4_5EEC_41DC_2C5237765760",
                "this.overlay_B4CF9D37_A3E5_CF7D_41DB_F9CE27E398A9"
            ]
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_8980C671_A464_DDF5_41D3_3CF97507BF08",
            "levels": [
                {
                    "url": "media/popup_8307940D_A465_DD2C_41DE_C1051616BA75_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1063,
                    "height": 696
                },
                {
                    "url": "media/popup_8307940D_A465_DD2C_41DE_C1051616BA75_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1024,
                    "height": 670
                },
                {
                    "url": "media/popup_8307940D_A465_DD2C_41DE_C1051616BA75_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 512,
                    "height": 335
                }
            ]
        },
        {
            "class": "FadeOutEffect",
            "duration": 500,
            "id": "FadeOutEffect_BA8C748A_A654_ED9E_41B9_AF4D4661F0C8",
            "easing": "cubic_out"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 0,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "restartMovementOnUserInteraction": false,
                "movements": [
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_in",
                        "yawDelta": 18.5
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "linear",
                        "yawDelta": 323
                    },
                    {
                        "class": "DistancePanoramaCameraMovement",
                        "yawSpeed": 7.96,
                        "easing": "cubic_out",
                        "yawDelta": 18.5
                    }
                ]
            },
            "id": "panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_camera"
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.MainViewer",
            "id": "MainViewerVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "Lantai 2",
            "id": "map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_t.png",
            "width": 1667,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10.png",
                        "class": "ImageResourceLevel",
                        "width": 1667,
                        "height": 2500
                    },
                    {
                        "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_lq.png",
                        "class": "ImageResourceLevel",
                        "width": 209,
                        "height": 314,
                        "tags": "preload"
                    }
                ]
            },
            "fieldOfViewOverlayRadiusScale": 0.18,
            "fieldOfViewOverlayOutsideColor": "#000000",
            "maximumZoomFactor": 4,
            "class": "Map",
            "fieldOfViewOverlayInsideOpacity": 0.4,
            "scaleMode": "fit_inside",
            "initialZoomFactor": 3,
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "height": 2500,
            "overlays": [
                "this.overlay_057D5FA6_18DC_7BE5_41AC_73FA8AC087FC",
                "this.overlay_05666006_18DD_A4A4_41A6_BF710D681160",
                "this.overlay_05C65210_18DD_E4BC_41AB_74800B671F88",
                "this.overlay_057496D9_2ADC_7159_41B1_9B7E6EA2D5DC"
            ]
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": -12.94,
                    "backwardYaw": -77.98,
                    "distance": 1,
                    "panorama": "this.panorama_0B945D70_13B8_5441_41AB_71247990FC35"
                }
            ],
            "hfov": 360,
            "label": "IMG_20260427_114453_00_007",
            "id": "panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D",
            "thumbnailUrl": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_t.jpg",
            "pitch": 0,
            "partial": false,
            "hfovMax": 130,
            "class": "Panorama",
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "top": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "right": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "back": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "bottom": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "left": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 1,
                                "tags": [
                                    "ondemand",
                                    "preload"
                                ],
                                "colCount": 1,
                                "width": 512,
                                "height": 512
                            }
                        ]
                    },
                    "thumbnailUrl": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_t.jpg"
                }
            ],
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_0685818E_18DC_E7A5_41A5_36F4479B0F10",
                    "class": "PanoramaMapLocation",
                    "angle": 178.86,
                    "y": 382.25,
                    "x": 678.72
                }
            ],
            "hfovMin": "150%",
            "overlays": [
                "this.overlay_0A02E72B_13B8_75C7_41B1_34F9D4A04557",
                "this.overlay_0A37A530_13C8_35C1_419E_9B3126FEC6A4",
                "this.overlay_B65C6E0B_A3EC_4D15_41E0_E9E591DA7000",
                "this.overlay_B4B98E0C_A3E5_CD13_41DF_F9102A07C446",
                "this.overlay_B4D54526_A3FB_DF1F_41DA_09E5F730C04C",
                "this.overlay_BB997D68_A3E4_CF14_41AC_23CF5491C87A",
                "this.overlay_BA91375A_A3DC_5B37_41CC_9A3C251AFB2E",
                "this.overlay_BA91075A_A3DC_5B37_41C0_3EFF5964E1C4"
            ]
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "MainViewer",
            "left": 0,
            "playbackBarBottom": 5,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#003366",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "toolTipBorderColor": "#767676",
            "toolTipShadowSpread": 0,
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "width": "100%",
            "minHeight": 50,
            "toolTipFontSize": "1.65vmin",
            "toolTipOpacity": 1,
            "toolTipShadowBlurRadius": 3,
            "playbackBarBackgroundColorDirection": "vertical",
            "toolTipTextShadowColor": "#000000",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "playbackBarHeadWidth": 6,
            "playbackBarRight": 0,
            "playbackBarHeight": 10,
            "minWidth": 100,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "playbackBarProgressBorderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "playbackBarProgressBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "progressBarBorderSize": 0,
            "toolTipShadowColor": "#333333",
            "height": "100%",
            "playbackBarBorderRadius": 0,
            "playbackBarHeadBorderRadius": 0,
            "transitionMode": "blending",
            "class": "ViewerArea",
            "playbackBarHeadBorderColor": "#000000",
            "shadow": false,
            "toolTipShadowOpacity": 1,
            "progressLeft": 0,
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarProgressBorderColor": "#000000",
            "playbackBarHeadBorderSize": 0,
            "playbackBarProgressOpacity": 1,
            "toolTipFontStyle": "normal",
            "playbackBarBorderSize": 0,
            "toolTipShadowHorizontalLength": 0,
            "propagateClick": true,
            "playbackBarBackgroundOpacity": 1,
            "toolTipFontFamily": "Arial",
            "toolTipShadowVerticalLength": 0,
            "vrPointerSelectionColor": "#FF6600",
            "toolTipTextShadowOpacity": 0,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadShadowColor": "#000000",
            "vrPointerSelectionTime": 2000,
            "paddingRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "progressRight": 0,
            "borderSize": 0,
            "progressBarBackgroundColorDirection": "vertical",
            "playbackBarHeadShadow": true,
            "progressBottom": 0,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "progressHeight": 10,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "progressBackgroundOpacity": 1,
            "top": 0,
            "playbackBarOpacity": 1,
            "displayTooltipInTouchScreens": true,
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "vrPointerColor": "#FFFFFF",
            "progressBarOpacity": 1,
            "playbackBarHeadShadowOpacity": 0.7,
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "toolTipBorderSize": 1,
            "toolTipPaddingTop": 4,
            "toolTipPaddingLeft": 6,
            "progressBorderRadius": 0,
            "paddingTop": 0,
            "toolTipDisplayTime": 600,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "paddingBottom": 0,
            "toolTipPaddingRight": 6,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "progressBackgroundColorRatios": [
                0
            ],
            "playbackBarHeadHeight": 15,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 500,
            "data": {
                "name": "Main Viewer"
            }
        },
        {
            "propagateClick": true,
            "scrollBarWidth": 10,
            "id": "Container_B156A269_BF46_B846_41CC_86CDE6B7F756",
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "right": "0%",
            "paddingLeft": 0,
            "children": [
                "this.Container_B1571269_BF46_B846_41D9_B94D861499DF",
                "this.Container_B1573269_BF46_B846_41AD_E3E55F50C328"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "width": 113.55,
            "minHeight": 1,
            "horizontalAlign": "left",
            "verticalAlign": "top",
            "scrollBarOpacity": 0.5,
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "minWidth": 1,
            "height": 588.15,
            "top": "0.12%",
            "gap": 10,
            "layout": "absolute",
            "paddingTop": 0,
            "backgroundOpacity": 0,
            "shadow": false,
            "paddingBottom": 0,
            "class": "Container",
            "borderRadius": 0,
            "overflow": "scroll",
            "data": {
                "name": "--SETTINGS"
            }
        },
        {
            "propagateClick": false,
            "scrollBarWidth": 10,
            "id": "Container_3DF0FE9C_1B6B_FDA4_41A2_73E9F65BFA2C",
            "left": "0%",
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "children": [
                "this.Image_8F66CA84_A37E_C9C2_41D4_688BAF626987"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "horizontalAlign": "left",
            "minHeight": 1,
            "verticalAlign": "top",
            "top": "3%",
            "scrollBarOpacity": 0.5,
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "minWidth": 1,
            "height": "19.601%",
            "width": "84.975%",
            "gap": 10,
            "layout": "absolute",
            "paddingTop": 0,
            "paddingLeft": 15,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0,
            "borderRadius": 0,
            "class": "Container",
            "data": {
                "name": "Tittle"
            },
            "overflow": "scroll"
        },
        {
            "propagateClick": false,
            "scrollBarWidth": 10,
            "id": "Container_320C1ADD_3F4A_FD16_41B0_FBCDFB126CCF",
            "left": "1.49%",
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "width": 240,
            "children": [
                "this.Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
                "this.Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "minHeight": 1,
            "horizontalAlign": "left",
            "verticalAlign": "top",
            "bottom": "1.99%",
            "contentOpaque": false,
            "minWidth": 1,
            "scrollBarMargin": 2,
            "height": 190,
            "scrollBarOpacity": 0.5,
            "gap": 10,
            "layout": "absolute",
            "paddingTop": 0,
            "backgroundOpacity": 0,
            "shadow": false,
            "paddingBottom": 0,
            "class": "Container",
            "borderRadius": 0,
            "overflow": "scroll",
            "data": {
                "name": "Container1772"
            }
        },
        {
            "backgroundColorRatios": [
                0,
                1
            ],
            "scrollBarWidth": 10,
            "id": "Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B",
            "left": "0%",
            "propagateClick": true,
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "right": "0%",
            "children": [
                "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "minHeight": 1,
            "backgroundColorDirection": "vertical",
            "verticalAlign": "top",
            "scrollBarOpacity": 0.5,
            "bottom": "0%",
            "contentOpaque": false,
            "minWidth": 1,
            "creationPolicy": "inAdvance",
            "top": "0%",
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
            "horizontalAlign": "left",
            "scrollBarMargin": 2,
            "backgroundColor": [
                "#000000",
                "#000000"
            ],
            "gap": 10,
            "layout": "absolute",
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0.6,
            "borderRadius": 0,
            "visible": false,
            "class": "Container",
            "data": {
                "name": "---FLOORPLAN"
            },
            "overflow": "scroll"
        },
        {
            "backgroundColorRatios": [
                0
            ],
            "id": "veilPopupPanorama",
            "left": 0,
            "propagateClick": false,
            "paddingLeft": 0,
            "paddingRight": 0,
            "right": 0,
            "borderSize": 0,
            "minHeight": 0,
            "backgroundColorDirection": "vertical",
            "showEffect": {
                "class": "FadeInEffect",
                "duration": 350,
                "easing": "cubic_in_out"
            },
            "bottom": 0,
            "minWidth": 0,
            "top": 0,
            "backgroundColor": [
                "#000000"
            ],
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0.55,
            "borderRadius": 0,
            "visible": false,
            "class": "UIComponent",
            "data": {
                "name": "UIComponent11573"
            }
        },
        {
            "backgroundColorRatios": [],
            "id": "zoomImagePopupPanorama",
            "left": 0,
            "propagateClick": false,
            "paddingLeft": 0,
            "paddingRight": 0,
            "right": 0,
            "borderSize": 0,
            "minHeight": 0,
            "backgroundColorDirection": "vertical",
            "bottom": 0,
            "minWidth": 0,
            "top": 0,
            "backgroundColor": [],
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 1,
            "scaleMode": "custom",
            "borderRadius": 0,
            "visible": false,
            "class": "ZoomImage",
            "data": {
                "name": "ZoomImage11574"
            }
        },
        {
            "textDecoration": "none",
            "shadowSpread": 1,
            "backgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "data": {
                "name": "CloseButton11575"
            },
            "id": "closeButtonPopupPanorama",
            "rollOverIconColor": "#666666",
            "propagateClick": false,
            "paddingLeft": 5,
            "paddingRight": 5,
            "fontFamily": "Arial",
            "right": 10,
            "fontColor": "#FFFFFF",
            "shadowColor": "#000000",
            "borderSize": 0,
            "iconHeight": 20,
            "minHeight": 0,
            "backgroundColorDirection": "vertical",
            "borderColor": "#000000",
            "horizontalAlign": "center",
            "verticalAlign": "middle",
            "showEffect": {
                "class": "FadeInEffect",
                "duration": 350,
                "easing": "cubic_in_out"
            },
            "iconColor": "#000000",
            "minWidth": 0,
            "iconLineWidth": 5,
            "mode": "push",
            "fontSize": "1.29vmin",
            "label": "",
            "backgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "shadowBlurRadius": 6,
            "top": 10,
            "gap": 5,
            "layout": "horizontal",
            "fontStyle": "normal",
            "pressedIconColor": "#888888",
            "paddingTop": 5,
            "shadow": false,
            "paddingBottom": 5,
            "backgroundOpacity": 0.3,
            "borderRadius": 0,
            "visible": false,
            "class": "CloseButton",
            "iconBeforeLabel": true,
            "iconWidth": 20,
            "cursor": "hand",
            "fontWeight": "normal"
        },
        {
            "transparencyActive": true,
            "maxHeight": 51.5,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "id": "IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
            "rollOverIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_rollover.png",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 45.5,
            "minHeight": 1,
            "toolTip": "Layar Penuh",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081.png",
            "pressedRollOverIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed_rollover.png",
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "toggle",
            "toolTipTextShadowBlurRadius": 3,
            "height": 51.5,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081_pressed.png",
            "toolTipShadowHorizontalLength": 0,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowVerticalLength": 0,
            "maxWidth": 45.5,
            "data": {
                "name": "IconButton FULLSCREEN"
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_0B945D70_13B8_5441_41AB_71247990FC35_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_8691FADC_A654_E5BA_419A_5148DEA9CAB8, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
            "media": "this.panorama_0B945D70_13B8_5441_41AB_71247990FC35",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_8691FADC_A654_E5BA_419A_5148DEA9CAB8"
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_86917ADC_A654_E5BA_41D4_FB360568B056, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
            "media": "this.panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_86917ADC_A654_E5BA_41D4_FB360568B056"
        },
        {
            "class": "PanoramaPlayListItem",
            "end": "this.trigger('tourEnded')",
            "camera": "this.panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_86913ADC_A654_E5BA_41D9_D1D066E41D3B, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 0)",
            "media": "this.panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_86913ADC_A654_E5BA_41D9_D1D066E41D3B"
        },
        {
            "progressBarBorderColor": "#0066FF",
            "data": {
                "name": "Floor Plan big"
            },
            "progressBackgroundColorDirection": "vertical",
            "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
            "left": "15%",
            "playbackBarBottom": 0,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#FFFFFF",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "toolTipBorderColor": "#767676",
            "right": "15%",
            "toolTipShadowSpread": 0,
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "minHeight": 1,
            "toolTipFontSize": 12,
            "toolTipOpacity": 1,
            "playbackBarHeadWidth": 6,
            "toolTipShadowBlurRadius": 3,
            "playbackBarHeight": 10,
            "playbackBarBackgroundColorDirection": "vertical",
            "toolTipTextShadowColor": "#000000",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "playbackBarRight": 0,
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "playbackBarProgressBorderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "playbackBarProgressBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "progressBarBorderSize": 0,
            "playbackBarBorderRadius": 0,
            "toolTipShadowColor": "#333333",
            "playbackBarHeadBorderRadius": 0,
            "transitionMode": "blending",
            "class": "ViewerArea",
            "playbackBarHeadBorderColor": "#000000",
            "shadow": false,
            "toolTipShadowOpacity": 1,
            "progressLeft": 0,
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarProgressBorderColor": "#000000",
            "playbackBarHeadBorderSize": 0,
            "playbackBarProgressOpacity": 1,
            "toolTipFontStyle": "normal",
            "playbackBarBorderSize": 0,
            "toolTipShadowHorizontalLength": 0,
            "propagateClick": false,
            "playbackBarBackgroundOpacity": 1,
            "toolTipFontFamily": "Arial",
            "toolTipShadowVerticalLength": 0,
            "vrPointerSelectionColor": "#FF6600",
            "toolTipTextShadowOpacity": 0,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadShadowColor": "#000000",
            "vrPointerSelectionTime": 2000,
            "paddingRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "progressRight": 0,
            "borderSize": 0,
            "progressBarBackgroundColorDirection": "vertical",
            "playbackBarHeadShadow": true,
            "progressBottom": 2,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "progressHeight": 10,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "progressBackgroundOpacity": 1,
            "top": "10%",
            "playbackBarOpacity": 1,
            "bottom": "10%",
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "vrPointerColor": "#FFFFFF",
            "displayTooltipInTouchScreens": true,
            "progressBarOpacity": 1,
            "playbackBarHeadShadowOpacity": 0.7,
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)",
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "toolTipBorderSize": 1,
            "toolTipPaddingTop": 4,
            "toolTipPaddingLeft": 6,
            "progressBorderRadius": 0,
            "paddingTop": 0,
            "toolTipDisplayTime": 600,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "paddingBottom": 0,
            "toolTipPaddingRight": 6,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "playbackBarHeadHeight": 15,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 500,
            "progressBackgroundColorRatios": [
                0.01
            ]
        },
        {
            "map": {
                "width": 80,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_0_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 647.37,
                "x": 2037.92,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 647.37,
                "width": 80,
                "x": 2037.92,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_0.png",
                            "class": "ImageResourceLevel",
                            "width": 79,
                            "height": 79
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "id": "overlay_0477A708_2ADC_10A7_4174_B8A05688A5E0",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 80,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_1_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 659.43,
                "x": 1404.21,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 659.43,
                "width": 80,
                "x": 1404.21,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_1.png",
                            "class": "ImageResourceLevel",
                            "width": 79,
                            "height": 79
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "id": "overlay_01753244_2ADC_10AF_4163_92D4A0256A0B",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 80,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_2_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 658.09,
                "x": 355.17,
                "offsetY": 0,
                "height": 80,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 80,
                "y": 658.09,
                "width": 80,
                "x": 355.17,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0165C931_2ADC_10E9_4135_B5B237DBFEB4_HS_2.png",
                            "class": "ImageResourceLevel",
                            "width": 79,
                            "height": 79
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 2)"
                }
            ],
            "id": "overlay_0403C929_2ADD_F0F9_4198_8CE81E121CCC",
            "data": {
                "label": "Image"
            }
        },
        {
            "transparencyActive": true,
            "maxHeight": 58,
            "toolTipFontFamily": "Arial",
            "toolTipShadowVerticalLength": 0,
            "propagateClick": true,
            "id": "IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 58,
            "minHeight": 1,
            "toolTip": "VR Mode",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7.png",
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "push",
            "toolTipTextShadowBlurRadius": 3,
            "height": 58,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "rollOverIconURL": "skin/IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7_rollover.png",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowHorizontalLength": 0,
            "maxWidth": 58,
            "data": {
                "name": "IconButton VR"
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "transparencyActive": true,
            "maxHeight": 51.5,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "id": "IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
            "rollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_rollover.png",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width":  45.5,
            "minHeight": 1,
            "toolTip": "Nonaktifkan Hotspot",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/nonaktifkan_hotspot_button_pressed.png",
            "pressedRollOverIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_rollover.png",
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "toggle",
            "toolTipTextShadowBlurRadius": 3,
            "height":  45.5,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781_pressed_v3.png",
            "toolTipShadowHorizontalLength": 0,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowVerticalLength": 0,
            "maxWidth":  45.5,
            "data": {
                "name": "IconButton HS "
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "transparencyActive": true,
            "maxHeight":  45.5,
            "toolTipFontFamily": "Arial",
            "toolTipShadowVerticalLength": 0,
            "propagateClick": true,
            "id": "IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
            "rollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_rollover_v2.png",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 45.5,
            "minHeight": 1,
            "toolTip": "Gyroscope",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_v2.png",
            "pressedRollOverIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_rollover_v2.png",
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "toggle",
            "toolTipTextShadowBlurRadius": 3,
            "height": 51.5,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_B156C269_BF46_B846_41B6_1BAAE2858250_pressed_v2.png",
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowHorizontalLength": 0,
            "maxWidth": 45.5,
            "data": {
                "name": "IconButton GYRO"
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 14.74,
                    "image": "this.AnimatedImageResource_B81CA732_A425_FB77_41D6_77083937BDE8",
                    "pitch": -2.5,
                    "yaw": -112.69,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Laboratorium Komputer",
                    "click": "this.openLink('labkom/index.htm', '_self')"
                }
            ],
            "id": "overlay_0B6919D0_13B8_5C40_4187_070E8B593AB8",
            "data": {
                "label": "Circle Door 01"
            },
            "maps": [
                {
                    "hfov": 14.74,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -112.69,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_0_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -2.5
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 24.19,
                    "image": "this.AnimatedImageResource_8927E0F2_A37E_5947_41D1_CCEEE44F2D6A",
                    "pitch": -37.78,
                    "yaw": 10.01,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Lantai 1",
                    "click": "this.openLink('../index.htm?media-name=IMG_20260427_114030_00_005', '_self')"
                }
            ],
            "id": "overlay_8F083CD8_A373_C943_41D7_047D1F32FBA6",
            "data": {
                "label": "Arrow 01c"
            },
            "maps": [
                {
                    "hfov": 24.19,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 10.01,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_4_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -37.78
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D, this.camera_86F4DB09_A654_E49A_41E0_C658D20B8AB3); this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "data": {
                "label": "Arrow 01c"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 15.24,
                    "image": "this.AnimatedImageResource_B81C4732_A425_FB77_41C0_523754553F19",
                    "pitch": -28.75,
                    "yaw": -77.98,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_8CA8EF98_A373_C7C3_41C9_1C678853FEA9",
            "maps": [
                {
                    "hfov": 15.24,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -77.98,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_5_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -28.75
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91, this.camera_86EDDAFF_A654_E576_41E1_4F3DBF4B51B5); this.mainPlayList.set('selectedIndex', 2)"
                }
            ],
            "data": {
                "label": "Arrow 01c"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 15.65,
                    "image": "this.AnimatedImageResource_892780F4_A37E_5942_41E1_40BB0C67C33F",
                    "pitch": -25.78,
                    "yaw": 94.06,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_9232CDB4_A372_4BC2_41B1_D8AC74583FCE",
            "maps": [
                {
                    "hfov": 15.65,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 94.06,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_6_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -25.78
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 7.16,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_7_0.png",
                                "class": "ImageResourceLevel",
                                "width": 117,
                                "height": 110
                            }
                        ]
                    },
                    "pitch": -0.55,
                    "yaw": 12.43,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BA43C2CC_A3DC_3513_41E2_61A2FA12DA05",
            "data": {
                "label": "Toilet"
            },
            "maps": [
                {
                    "hfov": 7.16,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 12.43,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_7_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 34,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -0.55
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 4.85,
                    "image": "this.AnimatedImageResource_B81C1733_A425_FB75_41C0_71E0594ECB5F",
                    "pitch": -0.38,
                    "yaw": 7.06,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BADAE76A_A3DC_DB14_41D5_193B52A57784",
            "data": {
                "label": "Info 02"
            },
            "maps": [
                {
                    "hfov": 4.85,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 7.06,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_8_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -0.38
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 11.22,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_9_0.png",
                                "class": "ImageResourceLevel",
                                "width": 184,
                                "height": 612
                            }
                        ]
                    },
                    "pitch": -6.43,
                    "yaw": -62.3
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_BEE63462_A424_5D14_41CB_003FF5095845",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 11.22,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -62.3,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_9_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 60,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -6.43
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 29.5,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_10_0.png",
                                "class": "ImageResourceLevel",
                                "width": 672,
                                "height": 163
                            }
                        ]
                    },
                    "pitch": -44.17,
                    "yaw": 15.83,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BEFA76EC_A424_5D13_41D8_4CFC417D8708",
            "data": {
                "label": "Ke-lantai 1"
            },
            "maps": [
                {
                    "hfov": 29.5,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 15.83,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_10_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 65,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -44.17
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 11.1,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_11_0.png",
                                "class": "ImageResourceLevel",
                                "width": 223,
                                "height": 102
                            }
                        ]
                    },
                    "pitch": -35.75,
                    "yaw": 95.01,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BE32F420_A424_3D14_41E1_A6D614745837",
            "data": {
                "label": "Kimia"
            },
            "maps": [
                {
                    "hfov": 11.1,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 95.01,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_11_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 34,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -35.75
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 50.34,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_12_0.png",
                                "class": "ImageResourceLevel",
                                "width": 955,
                                "height": 112
                            }
                        ]
                    },
                    "pitch": -30.46,
                    "yaw": 95.44,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BB41679A_A3DC_3B37_41B8_55953D2523DA",
            "data": {
                "label": "Laboratorium Pembelajaran "
            },
            "maps": [
                {
                    "hfov": 50.34,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 95.44,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_12_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 136,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -30.46
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 12.5,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_13_0.png",
                                "class": "ImageResourceLevel",
                                "width": 266,
                                "height": 101
                            }
                        ]
                    },
                    "pitch": -40,
                    "yaw": -76.78,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BE1C473B_A42C_3B75_41DC_6CC34AB36F9F",
            "data": {
                "label": "Biologi"
            },
            "maps": [
                {
                    "hfov": 12.5,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -76.78,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_13_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 42,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -40
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 47.59,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_14_0.png",
                                "class": "ImageResourceLevel",
                                "width": 955,
                                "height": 112
                            }
                        ]
                    },
                    "pitch": -35.42,
                    "yaw": -75.76,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BE1C573B_A42C_3B75_41CB_FA77BC575D9A",
            "data": {
                "label": "Laboratorium Pembelajaran "
            },
            "maps": [
                {
                    "hfov": 47.59,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -75.76,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_14_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 136,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -35.42
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 8.1,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_15_0.png",
                                "class": "ImageResourceLevel",
                                "width": 132,
                                "height": 386
                            }
                        ]
                    },
                    "pitch": -4.04,
                    "yaw": 83.09
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_BE396A12_A42C_7534_41D7_4178D72E54E1",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 8.1,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 83.09,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_15_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 66,
                                "height": 193
                            }
                        ]
                    },
                    "pitch": -4.04
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 8.03,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_16_0.png",
                                "class": "ImageResourceLevel",
                                "width": 131,
                                "height": 194
                            }
                        ]
                    },
                    "pitch": -15.09,
                    "yaw": 105.72
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Sofa Ruang Tunggu"
                }
            ],
            "id": "overlay_864E1E9C_A43C_4D33_41E1_EB5352AF3D99",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 8.03,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 105.72,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_16_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 65,
                                "height": 97
                            }
                        ]
                    },
                    "pitch": -15.09
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 7.95,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_17_0.png",
                                "class": "ImageResourceLevel",
                                "width": 130,
                                "height": 220
                            }
                        ]
                    },
                    "pitch": -19.1,
                    "yaw": 113.09
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Kotak Sampah"
                }
            ],
            "id": "overlay_8667CA28_A43C_3513_41E0_32D7C376BD09",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 7.95,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 113.09,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_17_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 65,
                                "height": 110
                            }
                        ]
                    },
                    "pitch": -19.1
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.showPopupPanoramaOverlay(this.popup_8CD133A0_A464_5B13_41D0_1766E3397665, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_89BE3666_A464_DD1C_41E1_02CD7662BFBF, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 9.07,
                    "image": "this.AnimatedImageResource_89AE164C_A464_DD13_41DC_18415D49B89C",
                    "pitch": -3.39,
                    "yaw": -125.17,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_8CBD1C52_A45C_4D34_41C5_93E127FBE166",
            "maps": [
                {
                    "hfov": 9.07,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -125.17,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_18_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -3.39
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.showPopupPanoramaOverlay(this.popup_8307940D_A465_DD2C_41DE_C1051616BA75, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_8980C671_A464_DDF5_41D3_3CF97507BF08, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 8.99,
                    "image": "this.AnimatedImageResource_89AED64D_A464_DD2C_41CD_54643941BD40",
                    "pitch": 8.45,
                    "yaw": -128.03,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_83CD93A7_A464_5B1D_41E3_F7673CDC87D3",
            "maps": [
                {
                    "hfov": 8.99,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -128.03,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_19_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 8.45
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 33.23,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_20_0.png",
                                "class": "ImageResourceLevel",
                                "width": 555,
                                "height": 82
                            }
                        ]
                    },
                    "pitch": -11.74,
                    "yaw": -110.61,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_868FFD3F_A654_BCF7_41E0_E0B0402A93CE",
            "data": {
                "label": "Laboratorium Komputer"
            },
            "maps": [
                {
                    "hfov": 33.23,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -110.61,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_20_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 108,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -11.74
                }
            ]
        },
        {
            "transparencyActive": true,
            "propagateClick": false,
            "id": "IconButton_A7361280_BCBD_AC04_41C9_358137CF7140",
            "left": "10%",
            "paddingRight": 0,
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 32,
            "horizontalAlign": "center",
            "minHeight": 0,
            "verticalAlign": "middle",
            "top": "4.75%",
            "iconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140.png",
            "minWidth": 0,
            "mode": "push",
            "height": 32,
            "rollOverIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_rollover.png",
            "paddingTop": 0,
            "backgroundOpacity": 0,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "borderRadius": 0,
            "pressedIconURL": "skin/IconButton_A7361280_BCBD_AC04_41C9_358137CF7140_pressed.png",
            "cursor": "hand",
            "data": {
                "name": "Button37510"
            }
        },
        {
            "transparencyActive": true,
            "propagateClick": false,
            "id": "IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
            "left": "12%",
            "paddingLeft": 0,
            "paddingRight": 0,
            "width": 32,
            "borderSize": 0,
            "minHeight": 0,
            "horizontalAlign": "center",
            "verticalAlign": "middle",
            "bottom": "27.18%",
            "minWidth": 0,
            "mode": "push",
            "height": 32,
            "iconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291.png",
            "rollOverIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_rollover.png",
            "paddingTop": 0,
            "backgroundOpacity": 0,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "borderRadius": 0,
            "pressedIconURL": "skin/IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291_pressed.png",
            "cursor": "hand",
            "data": {
                "name": "Button37499"
            }
        },
        {
            "progressBarBorderColor": "#000000",
            "data": {
                "name": "Floor Plan mini"
            },
            "progressBackgroundColorDirection": "vertical",
            "id": "MapViewer",
            "left": "0%",
            "playbackBarBottom": 0,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#003366",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "toolTipBorderColor": "#767676",
            "toolTipShadowSpread": 0,
            "playbackBarProgressBackgroundColorDirection": "vertical",
            "progressBarBackgroundColor": [
                "#3399FF"
            ],
            "progressBackgroundColor": [
                "#FFFFFF"
            ],
            "width": "100%",
            "minHeight": 1,
            "toolTipFontSize": "1.65vmin",
            "toolTipOpacity": 1,
            "playbackBarHeadWidth": 6,
            "toolTipShadowBlurRadius": 3,
            "playbackBarBackgroundColorDirection": "vertical",
            "toolTipTextShadowColor": "#000000",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "playbackBarRight": 0,
            "playbackBarHeight": 10,
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "playbackBarProgressBorderSize": 0,
            "toolTipTextShadowBlurRadius": 3,
            "playbackBarProgressBorderRadius": 0,
            "progressBarBorderRadius": 0,
            "progressBarBorderSize": 0,
            "playbackBarBorderRadius": 0,
            "toolTipShadowColor": "#333333",
            "playbackBarHeadBorderRadius": 0,
            "transitionMode": "fade_out_fade_in",
            "class": "ViewerArea",
            "playbackBarHeadBorderColor": "#000000",
            "shadow": false,
            "toolTipShadowOpacity": 1,
            "progressLeft": 0,
            "playbackBarHeadShadowHorizontalLength": 0,
            "playbackBarProgressBorderColor": "#000000",
            "playbackBarHeadBorderSize": 0,
            "playbackBarProgressOpacity": 1,
            "toolTipFontStyle": "normal",
            "playbackBarBorderSize": 0,
            "toolTipShadowHorizontalLength": 0,
            "propagateClick": false,
            "playbackBarBackgroundOpacity": 1,
            "toolTipFontFamily": "Arial",
            "toolTipShadowVerticalLength": 0,
            "vrPointerSelectionColor": "#FF6600",
            "toolTipTextShadowOpacity": 0,
            "playbackBarHeadBackgroundColor": [
                "#111111",
                "#666666"
            ],
            "playbackBarHeadShadowVerticalLength": 0,
            "playbackBarHeadShadowColor": "#000000",
            "vrPointerSelectionTime": 2000,
            "paddingRight": 0,
            "firstTransitionDuration": 0,
            "progressOpacity": 1,
            "progressRight": 0,
            "borderSize": 0,
            "progressBarBackgroundColorDirection": "vertical",
            "playbackBarHeadShadow": true,
            "progressBottom": 2,
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "progressHeight": 10,
            "playbackBarHeadBackgroundColorDirection": "vertical",
            "progressBackgroundOpacity": 1,
            "top": "0%",
            "playbackBarOpacity": 1,
            "bottom": "0%",
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "vrPointerColor": "#FFFFFF",
            "displayTooltipInTouchScreens": true,
            "progressBarOpacity": 1,
            "playbackBarHeadShadowOpacity": 0.7,
            "click": "this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, true, 0, null, null, false)",
            "playbackBarBorderColor": "#FFFFFF",
            "progressBorderSize": 0,
            "toolTipBorderSize": 1,
            "toolTipPaddingTop": 4,
            "toolTipPaddingLeft": 6,
            "progressBorderRadius": 0,
            "paddingTop": 0,
            "toolTipDisplayTime": 600,
            "playbackBarProgressBackgroundColorRatios": [
                0
            ],
            "playbackBarLeft": 0,
            "paddingBottom": 0,
            "toolTipPaddingRight": 6,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "playbackBarHeadHeight": 15,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 0,
            "progressBackgroundColorRatios": [
                0
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 8.02,
                    "image": "this.AnimatedImageResource_9F228A85_87FD_A321_41B6_8F716B20BC27",
                    "pitch": 0.63,
                    "yaw": 165.62,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Laboratorium Pembelajaran Kimia",
                    "click": "this.openLink('labkim/index.htm', '_self')"
                }
            ],
            "id": "overlay_0ABC4213_13B9_CFC0_41AF_ED64BE6959DE",
            "data": {
                "label": "Circle Door 01"
            },
            "maps": [
                {
                    "hfov": 8.02,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 165.62,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_0_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 0.63
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_0B945D70_13B8_5441_41AB_71247990FC35, this.camera_86E6CAEB_A654_E59E_41D7_73560B94D78B); this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "data": {
                "label": "Arrow 01c"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 20.88,
                    "image": "this.AnimatedImageResource_087E60F4_13C8_4C40_41B2_DB4BF9B8F25B",
                    "pitch": -21.72,
                    "yaw": -10.86,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_0A66AAFB_13C9_DC47_41AC_A108429A376C",
            "maps": [
                {
                    "hfov": 20.88,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -10.86,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_1_HS_1_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 29,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -21.72
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 14.93,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_2_0.png",
                                "class": "ImageResourceLevel",
                                "width": 496,
                                "height": 1909
                            }
                        ]
                    },
                    "pitch": -8.15,
                    "yaw": 121.47
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Ruang Dosen"
                }
            ],
            "id": "overlay_B54746E1_A3E4_5D14_41D6_9D6E9A454369",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 14.93,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 121.47,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_2_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 51,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -8.15
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 72.07,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_3_0.png",
                                "class": "ImageResourceLevel",
                                "width": 2048,
                                "height": 1075
                            }
                        ]
                    },
                    "pitch": -32.95,
                    "yaw": 76.01
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Kursi Tunggu"
                }
            ],
            "id": "overlay_B6B420E4_A3FD_F51C_41D7_79A3596CF7D3",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 72.07,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 76.01,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_3_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 104
                            }
                        ]
                    },
                    "pitch": -32.95
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 27.19,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_4_0.png",
                                "class": "ImageResourceLevel",
                                "width": 901,
                                "height": 107
                            }
                        ]
                    },
                    "pitch": -4.37,
                    "yaw": 166.55,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_B4B190D1_A3E7_D534_41CB_479DE1093407",
            "data": {
                "label": "Laboratorium Pembelajaran"
            },
            "maps": [
                {
                    "hfov": 27.19,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 166.55,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_4_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 134,
                                "height": 15
                            }
                        ]
                    },
                    "pitch": -4.37
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 10.21,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_5_0.png",
                                "class": "ImageResourceLevel",
                                "width": 341,
                                "height": 143
                            }
                        ]
                    },
                    "pitch": -8.1,
                    "yaw": 167.16,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_B4385E50_A3EC_4D34_4180_365414CACAB0",
            "data": {
                "label": "Kimia"
            },
            "maps": [
                {
                    "hfov": 10.21,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 167.16,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_5_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 38,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -8.1
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 9.48,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_6_0.png",
                                "class": "ImageResourceLevel",
                                "width": 314,
                                "height": 1226
                            }
                        ]
                    },
                    "pitch": -5.41,
                    "yaw": 15.55
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Laboratorium Bahasa Inggris"
                }
            ],
            "id": "overlay_B4ECD542_A3EC_5F17_41E1_C5A1C7195E19",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 9.48,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 15.55,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_6_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 51,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -5.41
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 8.74,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_7_0.png",
                                "class": "ImageResourceLevel",
                                "width": 289,
                                "height": 790
                            }
                        ]
                    },
                    "pitch": -4.06,
                    "yaw": 3.29
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_B4320E64_A3E4_4D1C_41C0_8723A0748137",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 8.74,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 3.29,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_7_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 72,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -4.06
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 6.53,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_8_0.png",
                                "class": "ImageResourceLevel",
                                "width": 216,
                                "height": 237
                            }
                        ]
                    },
                    "pitch": -10.11,
                    "yaw": -17.64
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Sofa Tunggu"
                }
            ],
            "id": "overlay_B4CA64EE_A3E4_5EEC_41DC_2C5237765760",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 6.53,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -17.64,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_8_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 108,
                                "height": 118
                            }
                        ]
                    },
                    "pitch": -10.11
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 9.77,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_9_0.png",
                                "class": "ImageResourceLevel",
                                "width": 323,
                                "height": 658
                            }
                        ]
                    },
                    "pitch": -16.67,
                    "yaw": -173.94
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_B4CF9D37_A3E5_CF7D_41DB_F9CE27E398A9",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 9.77,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -173.94,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_9_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 97,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -16.67
                }
            ]
        },
        {
            "map": {
                "width": 89.99,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_0_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 1835.83,
                "x": 633.9,
                "offsetY": 0,
                "height": 70.4,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 70.4,
                "y": 1835.47,
                "width": 89.99,
                "x": 633.73,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_0.png",
                            "class": "ImageResourceLevel",
                            "width": 89,
                            "height": 70
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 2)"
                }
            ],
            "id": "overlay_057D5FA6_18DC_7BE5_41AC_73FA8AC087FC",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 89.99,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_1_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 1059.47,
                "x": 648.15,
                "offsetY": 0,
                "height": 70.4,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 70.4,
                "y": 1059.12,
                "width": 89.99,
                "x": 647.97,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_1.png",
                            "class": "ImageResourceLevel",
                            "width": 89,
                            "height": 70
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "id": "overlay_05666006_18DD_A4A4_41A6_BF710D681160",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 89.99,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_2_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 347.22,
                "x": 633.9,
                "offsetY": 0,
                "height": 70.4,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 70.4,
                "y": 347.04,
                "width": 89.99,
                "x": 633.73,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_2.png",
                            "class": "ImageResourceLevel",
                            "width": 89,
                            "height": 70
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "id": "overlay_05C65210_18DD_E4BC_41AB_74800B671F88",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 89.99,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_3_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 20,
                            "height": 16
                        }
                    ]
                },
                "y": 347.04,
                "x": 633.73,
                "offsetY": 0,
                "height": 70.4,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 70.4,
                "y": 347.04,
                "width": 89.99,
                "x": 633.73,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_0685818E_18DC_E7A5_41A5_36F4479B0F10_HS_3.png",
                            "class": "ImageResourceLevel",
                            "width": 89,
                            "height": 70
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "id": "overlay_057496D9_2ADC_7159_41B1_9B7E6EA2D5DC",
            "data": {
                "label": "Image"
            }
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 17.36,
                    "image": "this.AnimatedImageResource_B81D5734_A425_FB73_41D7_60437A2040FB",
                    "pitch": -1.94,
                    "yaw": 177.21,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Laboratorium Pembelajaran Biologi",
                    "click": "this.openLink('Labbio/index.htm', '_self')"
                }
            ],
            "id": "overlay_0A02E72B_13B8_75C7_41B1_34F9D4A04557",
            "data": {
                "label": "Circle Door 01"
            },
            "maps": [
                {
                    "hfov": 17.36,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 177.21,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_0_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -1.94
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_0B945D70_13B8_5441_41AB_71247990FC35, this.camera_86E5EAF5_A654_E58A_419E_7C747EA4662B); this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "data": {
                "label": "Arrow 01c"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 17.22,
                    "image": "this.AnimatedImageResource_0879E0F4_13C8_4C40_4194_A20497B2F6B8",
                    "pitch": -29.75,
                    "yaw": -12.94,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_0A37A530_13C8_35C1_419E_9B3126FEC6A4",
            "maps": [
                {
                    "hfov": 17.22,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -12.94,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_1_HS_1_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 29,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -29.75
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 39.13,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_2_0.png",
                                "class": "ImageResourceLevel",
                                "width": 665,
                                "height": 1406
                            }
                        ]
                    },
                    "pitch": -12.37,
                    "yaw": -143.36
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Lemari AlaT Perlindungan Diri (APD)"
                }
            ],
            "id": "overlay_B65C6E0B_A3EC_4D15_41E0_E9E591DA7000",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 39.13,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -143.36,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_2_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 94,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -12.37
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 23.07,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_3_0.png",
                                "class": "ImageResourceLevel",
                                "width": 382,
                                "height": 901
                            }
                        ]
                    },
                    "pitch": -8.74,
                    "yaw": -33.44
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_B4B98E0C_A3E5_CD13_41DF_F9102A07C446",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 23.07,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -33.44,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_3_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 84,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -8.74
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 2.54,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_4_0.png",
                                "class": "ImageResourceLevel",
                                "width": 41,
                                "height": 177
                            }
                        ]
                    },
                    "pitch": -2.01,
                    "yaw": -11.56
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Rak Sepatu"
                }
            ],
            "id": "overlay_B4D54526_A3FB_DF1F_41DA_09E5F730C04C",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 2.54,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -11.56,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_4_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 20,
                                "height": 88
                            }
                        ]
                    },
                    "pitch": -2.01
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 35.18,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_5_0.png",
                                "class": "ImageResourceLevel",
                                "width": 594,
                                "height": 1443
                            }
                        ]
                    },
                    "pitch": -10.1,
                    "yaw": 97.27
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Ruang Dosen"
                }
            ],
            "id": "overlay_BB997D68_A3E4_CF14_41AC_23CF5491C87A",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 35.18,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 97.27,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_5_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 82,
                                "height": 200
                            }
                        ]
                    },
                    "pitch": -10.1
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 32.98,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_6_0.png",
                                "class": "ImageResourceLevel",
                                "width": 556,
                                "height": 65
                            }
                        ]
                    },
                    "pitch": -14.33,
                    "yaw": 179.72,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BA91375A_A3DC_5B37_41CC_9A3C251AFB2E",
            "data": {
                "label": "Laboratorium Pembelajaran"
            },
            "maps": [
                {
                    "hfov": 32.98,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 179.72,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_6_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 136,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -14.33
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 13.95,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_7_0.png",
                                "class": "ImageResourceLevel",
                                "width": 238,
                                "height": 70
                            }
                        ]
                    },
                    "pitch": -16.69,
                    "yaw": 179.84,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_BA91075A_A3DC_5B37_41C0_3EFF5964E1C4",
            "data": {
                "label": "Biologi"
            },
            "maps": [
                {
                    "hfov": 13.95,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 179.84,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_7_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 54,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -16.69
                }
            ]
        },
        {
            "propagateClick": true,
            "scrollBarWidth": 10,
            "id": "Container_B1571269_BF46_B846_41D9_B94D861499DF",
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "right": "0%",
            "paddingLeft": 0,
            "children": [
                "this.IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "width": 110,
            "minHeight": 1,
            "horizontalAlign": "center",
            "verticalAlign": "middle",
            "scrollBarOpacity": 0.5,
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "minWidth": 1,
            "height": 110,
            "top": "0%",
            "gap": 10,
            "layout": "horizontal",
            "paddingTop": 0,
            "backgroundOpacity": 0,
            "shadow": false,
            "paddingBottom": 0,
            "class": "Container",
            "borderRadius": 0,
            "overflow": "visible",
            "data": {
                "name": "button menu sup"
            }
        },
        {
            "propagateClick": true,
            "scrollBarWidth": 10,
            "id": "Container_B1573269_BF46_B846_41AD_E3E55F50C328",
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "right": "0%",
            "children": [
                "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
                "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
                "this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081",
                "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
                "this.IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
                "this.IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "minHeight": 1,
            "horizontalAlign": "center",
            "verticalAlign": "top",
            "scrollBarOpacity": 0.5,
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "minWidth": 1,
            "height": "59.417%",
            "width": "91.265%",
            "top": "14.96%",
            "gap": 3,
            "layout": "vertical",
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0,
            "borderRadius": 0,
            "visible": false,
            "class": "Container",
            "data": {
                "name": "-button set"
            },
            "overflow": "scroll"
        },
        {
            "maxHeight": 222,
            "propagateClick": false,
            "id": "Image_8F66CA84_A37E_C9C2_41D4_688BAF626987",
            "left": "0%",
            "paddingRight": 0,
            "paddingLeft": 0,
            "borderSize": 0,
            "url": "skin/Image_8F66CA84_A37E_C9C2_41D4_688BAF626987.png",
            "minHeight": 1,
            "horizontalAlign": "left",
            "verticalAlign": "top",
            "width": "100%",
            "minWidth": 1,
            "height": "58.392%",
            "top": "0%",
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0,
            "scaleMode": "fit_inside",
            "borderRadius": 0,
            "class": "Image",
            "data": {
                "name": "Image24129"
            },
            "maxWidth": 2000
        },
        {
            "backgroundColorRatios": [
                0,
                1
            ],
            "scrollBarWidth": 10,
            "id": "Container_B0DBDFD9_BF4E_E879_41D9_B737EF8BC042",
            "left": "0%",
            "propagateClick": false,
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "width": 190,
            "children": [
                "this.MapViewer"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "minHeight": 1,
            "backgroundColorDirection": "vertical",
            "horizontalAlign": "left",
            "verticalAlign": "top",
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "height": 190,
            "minWidth": 1,
            "scrollBarOpacity": 0.5,
            "top": "0%",
            "gap": 10,
            "layout": "absolute",
            "backgroundColor": [
                "#FFFFFF",
                "#FFFFFF"
            ],
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0.24,
            "borderRadius": 0,
            "class": "Container",
            "data": {
                "name": "minimap"
            },
            "overflow": "scroll"
        },
        {
            "propagateClick": false,
            "scrollBarWidth": 10,
            "id": "Container_0458057F_17F5_EF63_41B5_2CE2DF0373FD",
            "paddingLeft": 0,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "right": "0%",
            "children": [
                "this.IconButton_A2D1C7F9_BCBB_B404_41D2_ED3736EBD291",
                "this.IconButton_A7361280_BCBD_AC04_41C9_358137CF7140"
            ],
            "borderSize": 0,
            "scrollBarVisible": "rollOver",
            "minHeight": 1,
            "horizontalAlign": "left",
            "verticalAlign": "top",
            "scrollBarOpacity": 0.5,
            "scrollBarMargin": 2,
            "contentOpaque": false,
            "minWidth": 1,
            "height": "54.211%",
            "width": "20.833%",
            "top": "0%",
            "gap": 10,
            "layout": "absolute",
            "paddingTop": 0,
            "shadow": false,
            "paddingBottom": 0,
            "backgroundOpacity": 0,
            "borderRadius": 0,
            "class": "Container",
            "data": {
                "name": "zoom in out"
            },
            "overflow": "scroll"
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_B81CA732_A425_FB77_41D6_77083937BDE8",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 800,
                    "height": 1200
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_8927E0F2_A37E_5947_41D1_CCEEE44F2D6A",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_4_0.png",
                    "class": "ImageResourceLevel",
                    "width": 400,
                    "height": 360
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_B81C4732_A425_FB77_41C0_523754553F19",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_5_0.png",
                    "class": "ImageResourceLevel",
                    "width": 400,
                    "height": 360
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_892780F4_A37E_5942_41E1_40BB0C67C33F",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_6_0.png",
                    "class": "ImageResourceLevel",
                    "width": 400,
                    "height": 360
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_B81C1733_A425_FB75_41C0_71E0594ECB5F",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_8_0.png",
                    "class": "ImageResourceLevel",
                    "width": 460,
                    "height": 690
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_89AE164C_A464_DD13_41DC_18415D49B89C",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_18_0.png",
                    "class": "ImageResourceLevel",
                    "width": 460,
                    "height": 690
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_89AED64D_A464_DD2C_41CD_54643941BD40",
            "levels": [
                {
                    "url": "media/panorama_0B945D70_13B8_5441_41AB_71247990FC35_0_HS_19_0.png",
                    "class": "ImageResourceLevel",
                    "width": 460,
                    "height": 690
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_9F228A85_87FD_A321_41B6_8F716B20BC27",
            "levels": [
                {
                    "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_0_HS_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 800,
                    "height": 1200
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 3,
            "frameCount": 9,
            "frameDuration": 62,
            "colCount": 3,
            "id": "AnimatedImageResource_087E60F4_13C8_4C40_41B2_DB4BF9B8F25B",
            "levels": [
                {
                    "url": "media/panorama_0AE493A5_13B8_4CC3_4193_CFEAD1ABDC91_1_HS_1_0.png",
                    "class": "ImageResourceLevel",
                    "width": 330,
                    "height": 180
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 6,
            "frameCount": 24,
            "frameDuration": 41,
            "colCount": 4,
            "id": "AnimatedImageResource_B81D5734_A425_FB73_41D7_60437A2040FB",
            "levels": [
                {
                    "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_0_HS_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 800,
                    "height": 1200
                }
            ]
        },
        {
            "class": "AnimatedImageResource",
            "rowCount": 3,
            "frameCount": 9,
            "frameDuration": 62,
            "colCount": 3,
            "id": "AnimatedImageResource_0879E0F4_13C8_4C40_4194_A20497B2F6B8",
            "levels": [
                {
                    "url": "media/panorama_0A32A5FF_13B8_5440_41AE_C3AE5179E03D_1_HS_1_0.png",
                    "class": "ImageResourceLevel",
                    "width": 330,
                    "height": 180
                }
            ]
        },
        {
            "transparencyActive": true,
            "maxHeight": 60,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "id": "IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 60,
            "minHeight": 1,
            "toolTip": "Pilihan",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8.png",
            "pressedRollOverIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed_rollover.png",
            "minWidth": 1,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "toggle",
            "toolTipTextShadowBlurRadius": 3,
            "click": "if(!this.Container_B1573269_BF46_B846_41AD_E3E55F50C328.get('visible')){ this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_B1573269_BF46_B846_41AD_E3E55F50C328, false, 0, null, null, false) }",
            "height": 60,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_B1570269_BF46_B846_41E5_85A4CDAA64C8_pressed.png",
            "toolTipShadowHorizontalLength": 0,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowVerticalLength": 0,
            "maxWidth": 60,
            "data": {
                "name": "image button menu"
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "transparencyActive": true,
            "toolTipFontFamily": "Arial",
            "propagateClick": false,
            "id": "IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 45.5,
            "minHeight": 0,
            "toolTip": "Ruangan",
            "click": "document.getElementById('roomModal').style.display='flex'",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0.png",
            "pressedRollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed_rollover.png",
            "minWidth": 0,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "toggle",
            "toolTipTextShadowBlurRadius": 3,
            "height": 51.5,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "rollOverIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_rollover.png",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_81807A14_A3D3_C8C2_41D2_2FB04763F4E0_pressed.png",
            "toolTipShadowHorizontalLength": 0,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowVerticalLength": 0,
            "data": {
                "name": "Button1170"
            },
            "toolTipTextShadowOpacity": 0
        },
        {
            "transparencyActive": false,
            "toolTipFontFamily": "Arial",
            "propagateClick": true,
            "id": "IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6",
            "toolTipShadowSpread": 0,
            "paddingRight": 0,
            "toolTipBorderColor": "#767676",
            "paddingLeft": 0,
            "borderSize": 0,
            "width": 45.5,
            "minHeight": 0,
            "toolTip": "Panduan",
            "horizontalAlign": "center",
            "toolTipBackgroundColor": "#F6F6F6",
            "toolTipFontColor": "#606060",
            "toolTipShadowBlurRadius": 3,
            "toolTipFontSize": "1.65vmin",
            "verticalAlign": "middle",
            "toolTipTextShadowColor": "#000000",
            "toolTipOpacity": 1,
            "iconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6.png",
            "pressedRollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed_rollover.png",
            "minWidth": 0,
            "toolTipPaddingBottom": 4,
            "toolTipFontWeight": "normal",
            "mode": "push",
            "toolTipTextShadowBlurRadius": 3,
            "click": "this.showPopupImage(this.ImageResource_BA8C948A_A654_ED9E_41C0_310751FFD7BD, null, '90%', '90%', this.FadeInEffect_BA8C448A_A654_ED9E_41E4_31A208D0F3DF, this.FadeOutEffect_BA8C748A_A654_ED9E_41B9_AF4D4661F0C8, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
            "height": 51.5,
            "toolTipBorderSize": 1,
            "toolTipShadowColor": "#333333",
            "rollOverIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_rollover.png",
            "paddingTop": 0,
            "toolTipPaddingLeft": 6,
            "backgroundOpacity": 0,
            "toolTipDisplayTime": 600,
            "shadow": false,
            "paddingBottom": 0,
            "class": "IconButton",
            "toolTipPaddingTop": 4,
            "toolTipBorderRadius": 3,
            "borderRadius": 0,
            "toolTipShadowOpacity": 1,
            "pressedIconURL": "skin/IconButton_94F08154_8BFA_FF0A_41A0_A685D9FB33B6_pressed.png",
            "toolTipShadowHorizontalLength": 0,
            "toolTipPaddingRight": 6,
            "toolTipFontStyle": "normal",
            "cursor": "hand",
            "toolTipShadowVerticalLength": 0,
            "data": {
                "name": "Information"
            },
            "toolTipTextShadowOpacity": 0
        }],
        "width": "100%"
    };


    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function (index) {
        if (this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function () {
        if (!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function () {
        if (!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function () {
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function () {
        return this.pointer >= 0 && this.pointer < this.list.length - 1;
    };
    //

    if (script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
