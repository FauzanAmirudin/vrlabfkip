(function () {
    var script = {
        "mouseWheelEnabled": true,
        "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7,this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250], 'cardboardAvailable'); this.playList_BB75B0BE_A64C_A5F6_41C7_7BB551F640F5.set('selectedIndex', 0); this.playList_BB7B90CB_A64C_A59F_41C0_8939484590D0.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_B1569269_BF46_B846_41C8_6F2DFDD9F081].forEach(function(component) { component.set('visible', false); }) }",
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
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.45,
            "id": "popup_B1C90B24_93A6_3E21_41BA_25E3AC870408",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B1C90B24_93A6_3E21_41BA_25E3AC870408_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1447,
                        "height": 2048
                    }
                ]
            },
            "pitch": 7.29,
            "yaw": -147.75,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_BB7E90D2_A64C_A589_41DF_9D66E24D7FDF, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_BB7E90D2_A64C_A589_41DF_9D66E24D7FDF, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FFVideoPlayer)",
                    "media": "this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E",
                    "player": "this.viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FFVideoPlayer"
                }
            ],
            "id": "PlayList_BB7E90D2_A64C_A589_41DF_9D66E24D7FDF"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA37031_93FB_A2F9_41D8_9F913C42AC24",
            "levels": [
                {
                    "url": "media/popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1492,
                    "height": 1278
                },
                {
                    "url": "media/popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1024,
                    "height": 877
                },
                {
                    "url": "media/popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 512,
                    "height": 438
                }
            ]
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
                    "class": "MapPlayListItem",
                    "media": "this.map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D",
                    "player": "this.MapViewerMapPlayer"
                }
            ],
            "id": "playList_BB75B0BE_A64C_A5F6_41C7_7BB551F640F5"
        },
        {
            "class": "PlayList",
            "items": [
                "this.PanoramaPlayListItem_BB7C80CD_A64C_A59B_41DD_E2D809E643DB",
                "this.PanoramaPlayListItem_BB7C70CD_A64C_A59B_41D7_479A353440A7",
                "this.PanoramaPlayListItem_BB7DA0CE_A64C_A599_41E1_4D409BBE047F"
            ],
            "id": "mainPlayList"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_BE0A7BE6_939A_1E20_41C6_7BADF5231048",
            "levels": [
                {
                    "url": "media/popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1004,
                    "height": 1427
                },
                {
                    "url": "media/popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 720,
                    "height": 1024
                },
                {
                    "url": "media/popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 360,
                    "height": 512
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 7.92,
            "autoplay": true,
            "id": "popup_9DA4A71B_929E_17E0_41A7_61244A9EE49F",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 3.31,
            "yaw": 166.97,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            }
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.06,
            "id": "popup_BADC57FC_939E_3620_41D3_760439B2FF2A",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_BADC57FC_939E_3620_41D3_760439B2FF2A_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 3.47,
            "yaw": 149.42,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 100,
            "manualZoomSpeed": 8,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 165.13,
                "pitch": -7.75
            },
            "initialSequence": "this.sequence_BB3CF87E_A30E_0D1B_41D8_BE10759F5A54",
            "id": "panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_camera"
        },
        {
            "class": "Menu",
            "fontFamily": "Arial",
            "rollOverFontColor": "#FFFFFF",
            "selectedFontColor": "#FFFFFF",
            "children": [
                {
                    "class": "MenuItem",
                    "label": "IMG_20260414_131641_00_111",
                    "click": "this.mainPlayList.set('selectedIndex', 0)"
                },
                {
                    "class": "MenuItem",
                    "label": "IMG_20260414_131935_00_112",
                    "click": "this.mainPlayList.set('selectedIndex', 1)"
                },
                {
                    "class": "MenuItem",
                    "label": "IMG_20260414_132053_00_113",
                    "click": "this.mainPlayList.set('selectedIndex', 2)"
                }
            ],
            "label": "Media",
            "id": "Menu_BB7F50D4_A64C_A589_41DD_7ED2F5A87D7B",
            "backgroundColor": "#404040",
            "opacity": 0.4,
            "rollOverBackgroundColor": "#000000",
            "rollOverOpacity": 0.8,
            "selectedBackgroundColor": "#202020",
            "fontColor": "#FFFFFF"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_33F075D6_27F8_DDCF_4164_A44E579042FA",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_BB7BE0CB_A64C_A59F_41B8_9665BE561372"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BEVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_BB7E30D2_A64C_A589_41DC_C387892C1FDE, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_BB7E30D2_A64C_A589_41DC_C387892C1FDE, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BEVideoPlayer)",
                    "media": "this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E",
                    "player": "this.viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BEVideoPlayer"
                }
            ],
            "id": "PlayList_BB7E30D2_A64C_A589_41DC_C387892C1FDE"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 1.98,
            "id": "popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 720,
                        "height": 1024
                    }
                ]
            },
            "pitch": 2.54,
            "yaw": 152.71,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_BE068BEE_939A_1E20_41DA_CF29A87E4064",
            "levels": [
                {
                    "url": "media/popup_B48375B0_939A_0A20_412C_1031470ADF80_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1004,
                    "height": 1427
                },
                {
                    "url": "media/popup_B48375B0_939A_0A20_412C_1031470ADF80_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 720,
                    "height": 1024
                },
                {
                    "url": "media/popup_B48375B0_939A_0A20_412C_1031470ADF80_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 360,
                    "height": 512
                }
            ]
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "map labkom",
            "id": "map_33F075D6_27F8_DDCF_4164_A44E579042FA",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_t.png",
            "width": 1143,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA.png",
                        "class": "ImageResourceLevel",
                        "width": 1143,
                        "height": 2000
                    },
                    {
                        "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_lq.png",
                        "class": "ImageResourceLevel",
                        "width": 193,
                        "height": 338,
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
            "height": 2000,
            "overlays": [
                "this.overlay_3503EDD9_27FF_ADC5_41A5_B1A247584343",
                "this.overlay_3503CDD9_27FF_ADC5_41B1_94E3014DF513",
                "this.overlay_3503DDD9_27FF_ADC5_41BD_5860DB3EC18D"
            ]
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_BE7CAC02_939A_19E0_4194_A090775A92D6",
            "levels": [
                {
                    "url": "media/popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1004,
                    "height": 1427
                },
                {
                    "url": "media/popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 720,
                    "height": 1024
                },
                {
                    "url": "media/popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 360,
                    "height": 512
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.45,
            "id": "popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 724,
                        "height": 1024
                    }
                ]
            },
            "pitch": 3.84,
            "yaw": -174.01,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.44,
            "id": "popup_B5B68516_93AA_0BE1_41D4_53B43D537506",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B5B68516_93AA_0BE1_41D4_53B43D537506_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 724,
                        "height": 1024
                    }
                ]
            },
            "pitch": 6.36,
            "yaw": 105.86,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.43,
            "id": "popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 877
                    }
                ]
            },
            "pitch": 9.52,
            "yaw": -85.47,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA47036_93FB_A2FB_41D3_4F52BE98BB5B",
            "levels": [
                {
                    "url": "media/popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 944,
                    "height": 1222
                },
                {
                    "url": "media/popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 791,
                    "height": 1024
                },
                {
                    "url": "media/popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 395,
                    "height": 512
                }
            ]
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -2.27,
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
            "id": "camera_BA419193_A64C_A78E_41B4_666FD9B49D93"
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.MainViewer",
            "id": "MainViewerVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 716.82,
            "autoplay": true,
            "id": "popup_9F05FBEE_929A_3E21_41C9_A8F74D442B93",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 5.38,
            "yaw": -180,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            }
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA59037_93FB_A2F9_41D5_524EE3121EDB",
            "levels": [
                {
                    "url": "media/popup_9D12DC01_9386_6299_41C2_6D25A6874E02_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1492,
                    "height": 1278
                },
                {
                    "url": "media/popup_9D12DC01_9386_6299_41C2_6D25A6874E02_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1024,
                    "height": 877
                },
                {
                    "url": "media/popup_9D12DC01_9386_6299_41C2_6D25A6874E02_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 512,
                    "height": 438
                }
            ]
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_BE0D1BE5_939A_1E20_41B5_3CD7E300DB96",
            "levels": [
                {
                    "url": "media/popup_BADC57FC_939E_3620_41D3_760439B2FF2A_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2651,
                    "height": 3750
                },
                {
                    "url": "media/popup_BADC57FC_939E_3620_41D3_760439B2FF2A_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1447,
                    "height": 2048
                },
                {
                    "url": "media/popup_BADC57FC_939E_3620_41D3_760439B2FF2A_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                },
                {
                    "url": "media/popup_BADC57FC_939E_3620_41D3_760439B2FF2A_0_3.png",
                    "class": "ImageResourceLevel",
                    "width": 361,
                    "height": 512
                }
            ]
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA2802E_93FB_A2EB_41CB_026925B045E1",
            "levels": [
                {
                    "url": "media/popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 1492,
                    "height": 1278
                },
                {
                    "url": "media/popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1024,
                    "height": 877
                },
                {
                    "url": "media/popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 512,
                    "height": 438
                }
            ]
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window9275"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_BA75B68D_A64B_AD9A_41D7_1B8F68553DC9",
            "bodyBackgroundColorDirection": "vertical",
            "titlePaddingLeft": 5,
            "scrollBarColor": "#000000",
            "horizontalAlign": "center",
            "bodyPaddingTop": 0,
            "closeButtonRollOverBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "paddingLeft": 0,
            "headerVerticalAlign": "middle",
            "closeButtonPaddingTop": 5,
            "headerBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "bodyBackgroundOpacity": 0,
            "footerHeight": 5,
            "minHeight": 20,
            "scrollBarVisible": "rollOver",
            "scrollBarOpacity": 0.5,
            "closeButtonRollOverBackgroundColorDirection": "vertical",
            "veilColor": [
                "#000000",
                "#000000"
            ],
            "verticalAlign": "middle",
            "showEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "modal": true,
            "minWidth": 20,
            "veilColorRatios": [
                0,
                1
            ],
            "titleFontSize": "1.29vmin",
            "bodyPaddingBottom": 0,
            "closeButtonBorderColor": "#000000",
            "headerBackgroundColorDirection": "vertical",
            "backgroundColor": [],
            "closeButtonBackgroundColorDirection": "vertical",
            "shadowSpread": 1,
            "shadowVerticalLength": 0,
            "closeButtonBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverIconLineWidth": 5,
            "backgroundOpacity": 1,
            "closeButtonPressedIconLineWidth": 5,
            "shadow": true,
            "titlePaddingTop": 5,
            "class": "Window",
            "closeButtonPressedBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBorderColor": "#000000",
            "footerBackgroundOpacity": 0,
            "closeButtonPressedBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "overflow": "scroll",
            "veilOpacity": 0.4,
            "footerBackgroundColor": [
                "#FFFFFF",
                "#EEEEEE",
                "#DDDDDD"
            ],
            "propagateClick": false,
            "closeButtonRollOverBorderSize": 0,
            "headerPaddingRight": 0,
            "footerBackgroundColorDirection": "vertical",
            "children": [
                "this.viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FF"
            ],
            "veilShowEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "titlePaddingRight": 5,
            "closeButtonIconHeight": 20,
            "paddingRight": 0,
            "shadowColor": "#000000",
            "borderSize": 0,
            "titleFontFamily": "Arial",
            "headerPaddingBottom": 5,
            "backgroundColorDirection": "vertical",
            "closeButtonPressedBackgroundOpacity": 0.3,
            "closeButtonIconColor": "#000000",
            "closeButtonBackgroundOpacity": 0.3,
            "footerBackgroundColorRatios": [
                0,
                0.9,
                1
            ],
            "hideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "contentOpaque": false,
            "closeButtonPaddingRight": 5,
            "scrollBarMargin": 2,
            "closeButtonPaddingLeft": 5,
            "closeButtonPaddingBottom": 5,
            "headerPaddingLeft": 10,
            "veilHideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "headerPaddingTop": 10,
            "closeButtonBorderSize": 0,
            "closeButtonBorderRadius": 0,
            "shadowBlurRadius": 6,
            "bodyBackgroundColor": [
                "#FFFFFF",
                "#DDDDDD",
                "#FFFFFF"
            ],
            "shadowHorizontalLength": 3,
            "gap": 10,
            "layout": "vertical",
            "closeButtonPressedBorderColor": "#000000",
            "headerBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "headerBackgroundOpacity": 0,
            "closeButtonBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "shadowOpacity": 0.5,
            "bodyPaddingLeft": 0,
            "closeButtonIconLineWidth": 5,
            "paddingBottom": 0,
            "borderRadius": 5,
            "titlePaddingBottom": 5,
            "paddingTop": 0,
            "closeButtonRollOverBackgroundOpacity": 0.3,
            "scrollBarWidth": 10,
            "closeButtonIconWidth": 20,
            "bodyBackgroundColorRatios": [
                0,
                0.5,
                1
            ],
            "closeButtonRollOverIconColor": "#666666"
        },
        {
            "fieldOfViewOverlayOutsideOpacity": 0,
            "label": "Labkom",
            "id": "map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D",
            "minimumZoomFactor": 0.5,
            "thumbnailUrl": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_t.png",
            "width": 3571,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D.png",
                        "class": "ImageResourceLevel",
                        "width": 1828,
                        "height": 3200
                    },
                    {
                        "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_lq.png",
                        "class": "ImageResourceLevel",
                        "width": 193,
                        "height": 338,
                        "tags": "preload"
                    }
                ]
            },
            "fieldOfViewOverlayRadiusScale": 0.3,
            "fieldOfViewOverlayOutsideColor": "#000000",
            "maximumZoomFactor": 4,
            "class": "Map",
            "fieldOfViewOverlayInsideOpacity": 0.4,
            "scaleMode": "fit_to_width",
            "initialZoomFactor": 2,
            "fieldOfViewOverlayInsideColor": "#FFFFFF",
            "height": 6249,
            "overlays": [
                "this.overlay_3F1E8254_1B74_A4A4_4186_00B544CE86B3",
                "this.overlay_3F5DAABF_1B75_A5E3_4198_0DE31D65A828",
                "this.overlay_3F0E1248_1B74_64AD_41B1_18F8BC0B8A32"
            ]
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window9274"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_BA75468C_A64B_AD9A_41D1_308FCD48126B",
            "bodyBackgroundColorDirection": "vertical",
            "titlePaddingLeft": 5,
            "scrollBarColor": "#000000",
            "horizontalAlign": "center",
            "bodyPaddingTop": 0,
            "closeButtonRollOverBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "paddingLeft": 0,
            "headerVerticalAlign": "middle",
            "closeButtonPaddingTop": 5,
            "headerBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "bodyBackgroundOpacity": 0,
            "footerHeight": 5,
            "minHeight": 20,
            "scrollBarVisible": "rollOver",
            "scrollBarOpacity": 0.5,
            "closeButtonRollOverBackgroundColorDirection": "vertical",
            "veilColor": [
                "#000000",
                "#000000"
            ],
            "verticalAlign": "middle",
            "showEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "modal": true,
            "minWidth": 20,
            "veilColorRatios": [
                0,
                1
            ],
            "titleFontSize": "1.29vmin",
            "bodyPaddingBottom": 0,
            "closeButtonBorderColor": "#000000",
            "headerBackgroundColorDirection": "vertical",
            "backgroundColor": [],
            "closeButtonBackgroundColorDirection": "vertical",
            "shadowSpread": 1,
            "shadowVerticalLength": 0,
            "closeButtonBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverIconLineWidth": 5,
            "backgroundOpacity": 1,
            "closeButtonPressedIconLineWidth": 5,
            "shadow": true,
            "titlePaddingTop": 5,
            "class": "Window",
            "closeButtonPressedBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBorderColor": "#000000",
            "footerBackgroundOpacity": 0,
            "closeButtonPressedBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "overflow": "scroll",
            "veilOpacity": 0.4,
            "footerBackgroundColor": [
                "#FFFFFF",
                "#EEEEEE",
                "#DDDDDD"
            ],
            "propagateClick": false,
            "closeButtonRollOverBorderSize": 0,
            "headerPaddingRight": 0,
            "footerBackgroundColorDirection": "vertical",
            "children": [
                "this.viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393"
            ],
            "veilShowEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "titlePaddingRight": 5,
            "closeButtonIconHeight": 20,
            "paddingRight": 0,
            "shadowColor": "#000000",
            "borderSize": 0,
            "titleFontFamily": "Arial",
            "headerPaddingBottom": 5,
            "backgroundColorDirection": "vertical",
            "closeButtonPressedBackgroundOpacity": 0.3,
            "closeButtonIconColor": "#000000",
            "closeButtonBackgroundOpacity": 0.3,
            "footerBackgroundColorRatios": [
                0,
                0.9,
                1
            ],
            "hideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "contentOpaque": false,
            "closeButtonPaddingRight": 5,
            "scrollBarMargin": 2,
            "closeButtonPaddingLeft": 5,
            "closeButtonPaddingBottom": 5,
            "headerPaddingLeft": 10,
            "veilHideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "headerPaddingTop": 10,
            "closeButtonBorderSize": 0,
            "closeButtonBorderRadius": 0,
            "shadowBlurRadius": 6,
            "bodyBackgroundColor": [
                "#FFFFFF",
                "#DDDDDD",
                "#FFFFFF"
            ],
            "shadowHorizontalLength": 3,
            "gap": 10,
            "layout": "vertical",
            "closeButtonPressedBorderColor": "#000000",
            "headerBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "headerBackgroundOpacity": 0,
            "closeButtonBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "shadowOpacity": 0.5,
            "bodyPaddingLeft": 0,
            "closeButtonIconLineWidth": 5,
            "paddingBottom": 0,
            "borderRadius": 5,
            "titlePaddingBottom": 5,
            "paddingTop": 0,
            "closeButtonRollOverBackgroundOpacity": 0.3,
            "scrollBarWidth": 10,
            "closeButtonIconWidth": 20,
            "bodyBackgroundColorRatios": [
                0,
                0.5,
                1
            ],
            "closeButtonRollOverIconColor": "#666666"
        },
        {
            "class": "MapPlayer",
            "viewerArea": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4",
            "id": "ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer",
            "movementMode": "constrained"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_B1C72B1E_93A6_3FE1_41DC_EFBCDB721EEC",
            "levels": [
                {
                    "url": "media/popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2652,
                    "height": 3750
                },
                {
                    "url": "media/popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1448,
                    "height": 2048
                },
                {
                    "url": "media/popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 724,
                    "height": 1024
                },
                {
                    "url": "media/popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B_0_3.png",
                    "class": "ImageResourceLevel",
                    "width": 362,
                    "height": 512
                }
            ]
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_BB7B30CC_A64C_A599_41CA_AB00630149E6, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_BB7B30CC_A64C_A599_41CA_AB00630149E6, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "media": "this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_BB7B30CC_A64C_A599_41CA_AB00630149E6"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -16.05,
                "pitch": -4.34
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "movements": [
                    {
                        "targetYaw": 163.76,
                        "class": "TargetPanoramaCameraMovement",
                        "targetHfov": 90,
                        "hfovSpeed": 33.25,
                        "path": "shortest",
                        "targetPitch": -0.09,
                        "yawSpeed": 33.25,
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.05
                    },
                    {
                        "targetYaw": -16.05,
                        "class": "TargetPanoramaCameraMovement",
                        "targetHfov": 90,
                        "hfovSpeed": 33.25,
                        "path": "longest",
                        "targetPitch": -4.34,
                        "yawSpeed": 33.25,
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.05
                    }
                ],
                "repeat": 0,
                "restartMovementOnUserInteraction": false
            },
            "id": "panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_camera"
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": 164.04,
                    "backwardYaw": -5.65,
                    "distance": 1,
                    "panorama": "this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E"
                }
            ],
            "hfov": 360,
            "label": "IMG_20260414_132053_00_113",
            "id": "panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2",
            "thumbnailUrl": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_t.jpg",
            "pitch": 0,
            "partial": false,
            "cardboardMenu": "this.Menu_BB7F50D4_A64C_A589_41DD_7ED2F5A87D7B",
            "hfovMax": 130,
            "class": "Panorama",
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/f/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/u/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/r/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/b/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/d/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0/l/3/{row}_{column}.jpg",
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
                    "thumbnailUrl": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_t.jpg"
                }
            ],
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D",
                    "class": "PanoramaMapLocation",
                    "angle": 19.83,
                    "y": 490.59,
                    "x": 2058.71
                }
            ],
            "hfovMin": "120%",
            "overlays": [
                "this.popup_091B8811_19A3_43FA_417B_860E816A49B1",
                "this.popup_09152819_19A3_43EA_41B8_7696E6AD3203",
                "this.popup_09157819_19A3_43EA_41B3_E078E7E34CB6",
                "this.popup_0915A819_19A3_43EA_41B8_FB3734F1591E",
                "this.popup_0915E81B_19A3_43ED_4192_522F66AE8B97",
                "this.overlay_9F4A9C9E_8EF7_1430_41D8_0A2BF711EDED",
                "this.popup_9DA4A71B_929E_17E0_41A7_61244A9EE49F",
                "this.overlay_9DE67A0A_929A_19E0_41D2_3D407C7B14F4",
                "this.overlay_B0350B86_93A6_3EE1_41AD_46E5625279B9",
                "this.overlay_B036FB88_93A6_3EE0_41DC_6A83BA8FB80E",
                "this.overlay_B036EB88_93A6_3EE0_41E1_142FFF18B47F",
                "this.overlay_B036FB89_93A6_3EE0_41D7_79A03DE40C95",
                "this.overlay_B036EB89_93A6_3EE0_41BD_46B9D40FE475",
                "this.popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B",
                "this.popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE",
                "this.popup_B1C94B23_93A6_3E27_41E1_8092BD84E36C",
                "this.popup_B1C90B24_93A6_3E21_41BA_25E3AC870408",
                "this.popup_B1CACB26_93A6_3E20_41E0_0580BAF27CC7",
                "this.popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5",
                "this.popup_9D12DC01_9386_6299_41C2_6D25A6874E02",
                "this.overlay_B89B8EC0_A372_4942_41A5_56D9576DDD16",
                "this.overlay_B9F29A6E_A372_495E_41E3_D1B83001F616"
            ]
        },
        {
            "class": "Video",
            "label": "Laboratorium komputer",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E_t.jpg",
            "width": 2964,
            "loop": false,
            "id": "video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E",
            "height": 1694,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            }
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_BB7BD0CC_A64C_A599_41CD_26D6AE2A672E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_BB7BD0CC_A64C_A599_41CD_26D6AE2A672E, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
                    "media": "this.video_23D2E733_3F31_E3A7_41C4_2258EF58414F",
                    "player": "this.MainViewerVideoPlayer"
                }
            ],
            "id": "playList_BB7BD0CC_A64C_A599_41CD_26D6AE2A672E"
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -5.48,
                "pitch": -3.97
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
            "id": "panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_camera"
        },
        {
            "class": "Video",
            "label": "Virtual Reality (1)",
            "scaleMode": "fit_inside",
            "thumbnailUrl": "media/video_23D2E733_3F31_E3A7_41C4_2258EF58414F_t.jpg",
            "width": 2240,
            "loop": false,
            "id": "video_23D2E733_3F31_E3A7_41C4_2258EF58414F",
            "height": 2240,
            "video": {
                "width": 2240,
                "class": "VideoResource",
                "height": 2240,
                "mp4Url": "media/video_23D2E733_3F31_E3A7_41C4_2258EF58414F.mp4"
            }
        },
        {
            "closeButtonPressedBackgroundColorDirection": "vertical",
            "closeButtonPressedIconColor": "#888888",
            "backgroundColorRatios": [],
            "data": {
                "name": "Window9276"
            },
            "closeButtonPressedBorderSize": 0,
            "bodyPaddingRight": 0,
            "id": "window_BA75F68E_A64B_AD96_41DB_8F82EA5FEC0F",
            "bodyBackgroundColorDirection": "vertical",
            "titlePaddingLeft": 5,
            "scrollBarColor": "#000000",
            "horizontalAlign": "center",
            "bodyPaddingTop": 0,
            "closeButtonRollOverBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "paddingLeft": 0,
            "headerVerticalAlign": "middle",
            "closeButtonPaddingTop": 5,
            "headerBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "bodyBackgroundOpacity": 0,
            "footerHeight": 5,
            "minHeight": 20,
            "scrollBarVisible": "rollOver",
            "scrollBarOpacity": 0.5,
            "closeButtonRollOverBackgroundColorDirection": "vertical",
            "veilColor": [
                "#000000",
                "#000000"
            ],
            "verticalAlign": "middle",
            "showEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "modal": true,
            "minWidth": 20,
            "veilColorRatios": [
                0,
                1
            ],
            "titleFontSize": "1.29vmin",
            "bodyPaddingBottom": 0,
            "closeButtonBorderColor": "#000000",
            "headerBackgroundColorDirection": "vertical",
            "backgroundColor": [],
            "closeButtonBackgroundColorDirection": "vertical",
            "shadowSpread": 1,
            "shadowVerticalLength": 0,
            "closeButtonBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverIconLineWidth": 5,
            "backgroundOpacity": 1,
            "closeButtonPressedIconLineWidth": 5,
            "shadow": true,
            "titlePaddingTop": 5,
            "class": "Window",
            "closeButtonPressedBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBorderColor": "#000000",
            "footerBackgroundOpacity": 0,
            "closeButtonPressedBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "overflow": "scroll",
            "veilOpacity": 0.4,
            "footerBackgroundColor": [
                "#FFFFFF",
                "#EEEEEE",
                "#DDDDDD"
            ],
            "propagateClick": false,
            "closeButtonRollOverBorderSize": 0,
            "headerPaddingRight": 0,
            "footerBackgroundColorDirection": "vertical",
            "children": [
                "this.viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BE"
            ],
            "veilShowEffect": {
                "class": "FadeInEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "titlePaddingRight": 5,
            "closeButtonIconHeight": 20,
            "paddingRight": 0,
            "shadowColor": "#000000",
            "borderSize": 0,
            "titleFontFamily": "Arial",
            "headerPaddingBottom": 5,
            "backgroundColorDirection": "vertical",
            "closeButtonPressedBackgroundOpacity": 0.3,
            "closeButtonIconColor": "#000000",
            "closeButtonBackgroundOpacity": 0.3,
            "footerBackgroundColorRatios": [
                0,
                0.9,
                1
            ],
            "hideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "contentOpaque": false,
            "closeButtonPaddingRight": 5,
            "scrollBarMargin": 2,
            "closeButtonPaddingLeft": 5,
            "closeButtonPaddingBottom": 5,
            "headerPaddingLeft": 10,
            "veilHideEffect": {
                "class": "FadeOutEffect",
                "duration": 500,
                "easing": "cubic_in_out"
            },
            "headerPaddingTop": 10,
            "closeButtonBorderSize": 0,
            "closeButtonBorderRadius": 0,
            "shadowBlurRadius": 6,
            "bodyBackgroundColor": [
                "#FFFFFF",
                "#DDDDDD",
                "#FFFFFF"
            ],
            "shadowHorizontalLength": 3,
            "gap": 10,
            "layout": "vertical",
            "closeButtonPressedBorderColor": "#000000",
            "headerBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "closeButtonRollOverBackgroundColor": [
                "#DDDDDD",
                "#EEEEEE",
                "#FFFFFF"
            ],
            "headerBackgroundOpacity": 0,
            "closeButtonBackgroundColorRatios": [
                0,
                0.1,
                1
            ],
            "shadowOpacity": 0.5,
            "bodyPaddingLeft": 0,
            "closeButtonIconLineWidth": 5,
            "paddingBottom": 0,
            "borderRadius": 5,
            "titlePaddingBottom": 5,
            "paddingTop": 0,
            "closeButtonRollOverBackgroundOpacity": 0.3,
            "scrollBarWidth": 10,
            "closeButtonIconWidth": 20,
            "bodyBackgroundColorRatios": [
                0,
                0.5,
                1
            ],
            "closeButtonRollOverIconColor": "#666666"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.86,
            "id": "popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 877
                    }
                ]
            },
            "pitch": 4.22,
            "yaw": 145.8,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.47,
            "id": "popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 791,
                        "height": 1024
                    }
                ]
            },
            "pitch": 4.83,
            "yaw": -167.79,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_AB888B7B_8BE6_63FE_41C4_CC185248B99F",
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
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.58,
            "id": "popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1447,
                        "height": 2048
                    }
                ]
            },
            "pitch": 8.6,
            "yaw": -71.64,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA1602D_93FB_A2E9_41DB_0A340A43FAA9",
            "levels": [
                {
                    "url": "media/popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 944,
                    "height": 1222
                },
                {
                    "url": "media/popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 791,
                    "height": 1024
                },
                {
                    "url": "media/popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 395,
                    "height": 512
                }
            ]
        },
        {
            "class": "FadeOutEffect",
            "duration": 500,
            "id": "FadeOutEffect_AB88EB7B_8BE6_63FE_41DC_81AD65F82DDD",
            "easing": "cubic_out"
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "begin": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer.set('movementMode', 'constrained')",
                    "class": "MapPlayListItem",
                    "media": "this.map_33F075D6_27F8_DDCF_4164_A44E579042FA",
                    "player": "this.ViewerAreaLabeled_37D66D51_27F9_B2C5_4192_CC495446A0D4MapPlayer"
                }
            ],
            "id": "playList_BB7B90CB_A64C_A59F_41C0_8939484590D0"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.46,
            "id": "popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 791,
                        "height": 1024
                    }
                ]
            },
            "pitch": 5.42,
            "yaw": 130.77,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "gyroscopeEnabled": true,
            "class": "PanoramaPlayer",
            "buttonCardboardView": "this.IconButton_B156D269_BF46_B846_41E3_844E5B5A8AE7",
            "buttonToggleHotspots": "this.IconButton_B156E269_BF46_B846_41E0_1BA0FC1CC781",
            "displayPlaybackBar": true,
            "viewerArea": "this.MainViewer",
            "id": "MainViewerPanoramaPlayer",
            "touchControlMode": "drag_acceleration",
            "gyroscopeVerticalDraggingEnabled": false,
            "buttonToggleGyroscope": "this.IconButton_B156C269_BF46_B846_41B6_1BAAE2858250",
            "mouseControlMode": "drag_acceleration"
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
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.46,
            "id": "popup_9D12DC01_9386_6299_41C2_6D25A6874E02",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_9D12DC01_9386_6299_41C2_6D25A6874E02_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 877
                    }
                ]
            },
            "pitch": 6.46,
            "yaw": -155.55,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_B8BFEC18_93AE_19E1_41C5_253D7B3C1A30",
            "levels": [
                {
                    "url": "media/popup_B6374988_93BE_1AE0_41C6_CF8C6296A399_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 944,
                    "height": 1222
                },
                {
                    "url": "media/popup_B6374988_93BE_1AE0_41C6_CF8C6296A399_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 791,
                    "height": 1024
                },
                {
                    "url": "media/popup_B6374988_93BE_1AE0_41C6_CF8C6296A399_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 395,
                    "height": 512
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.43,
            "id": "popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 720,
                        "height": 1024
                    }
                ]
            },
            "pitch": 7.23,
            "yaw": -137.2,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": 174.35,
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
            "id": "camera_BB92710B_A64C_A49E_41DF_1A958EA19F56"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 61.55,
            "autoplay": true,
            "id": "popup_9CF8BF7A_929E_3620_41DE_3297780BDEF2",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "loop": false,
            "popupMaxHeight": "95%",
            "pitch": 20.55,
            "yaw": 12.65,
            "hideDuration": 500,
            "popupDistance": 100,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            }
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": -5.65,
                    "backwardYaw": 164.04,
                    "distance": 1,
                    "panorama": "this.panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2"
                },
                {
                    "class": "AdjacentPanorama",
                    "yaw": 177.73,
                    "backwardYaw": 177.17,
                    "distance": 1,
                    "panorama": "this.panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6"
                }
            ],
            "hfov": 360,
            "label": "IMG_20260414_131935_00_112",
            "id": "panorama_B8976067_B63F_4C4D_41D4_82276E08E98E",
            "thumbnailUrl": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_t.jpg",
            "pitch": 0,
            "partial": false,
            "cardboardMenu": "this.Menu_BB7F50D4_A64C_A589_41DD_7ED2F5A87D7B",
            "hfovMax": 130,
            "class": "Panorama",
            "frames": [
                {
                    "class": "CubicPanoramaFrame",
                    "front": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/f/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/u/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/r/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/b/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/d/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0/l/3/{row}_{column}.jpg",
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
                    "thumbnailUrl": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_t.jpg"
                }
            ],
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D",
                    "class": "PanoramaMapLocation",
                    "angle": 0,
                    "y": 2641.69,
                    "x": 2111.23
                }
            ],
            "hfovMin": "120%",
            "overlays": [
                "this.overlay_094AB12E_19AC_C427_4184_558E15996828",
                "this.overlay_094AA12E_19AC_C427_41B7_D54BC612F322",
                "this.overlay_094A912E_19AC_C427_41B9_56DCEF9E054C",
                "this.overlay_094A812E_19AC_C427_4152_907AE9A120B0",
                "this.overlay_094A712E_19AC_C427_41B6_2B80DC54BF1D",
                "this.popup_0946F10E_19AC_C5E7_41AB_8B05418F03C2",
                "this.popup_0946B10E_19AC_C5E7_4177_479386C984F9",
                "this.popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1",
                "this.overlay_9DB23AAE_8EF1_3C10_41DF_99F687786B80",
                "this.popup_9F05FBEE_929A_3E21_41C9_A8F74D442B93",
                "this.overlay_9C2BD372_929E_0E20_41D8_19B1D8EADD1E",
                "this.overlay_9C581470_929A_0A21_41BB_C10A4626DF01",
                "this.popup_B6374988_93BE_1AE0_41C6_CF8C6296A399",
                "this.popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7",
                "this.popup_B48375B0_939A_0A20_412C_1031470ADF80",
                "this.popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70",
                "this.overlay_83221801_93FA_6299_41E0_6FA800452E66",
                "this.overlay_B107203F_A351_D93D_41E0_A40162F100B7",
                "this.overlay_B1077040_A351_D943_41D2_C30431C0FCA8",
                "this.overlay_B486C22F_A372_58DE_41D0_9113BF65C6F8",
                "this.overlay_B58F36B8_A371_B9C3_41CF_73F1DFC60335"
            ]
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_B5B6E516_93AA_0BE1_41E0_860EAFD6937B",
            "levels": [
                {
                    "url": "media/popup_B5B68516_93AA_0BE1_41D4_53B43D537506_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2652,
                    "height": 3750
                },
                {
                    "url": "media/popup_B5B68516_93AA_0BE1_41D4_53B43D537506_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1448,
                    "height": 2048
                },
                {
                    "url": "media/popup_B5B68516_93AA_0BE1_41D4_53B43D537506_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 724,
                    "height": 1024
                },
                {
                    "url": "media/popup_B5B68516_93AA_0BE1_41D4_53B43D537506_0_3.png",
                    "class": "ImageResourceLevel",
                    "width": 362,
                    "height": 512
                }
            ]
        },
        {
            "class": "FadeInEffect",
            "duration": 500,
            "id": "FadeInEffect_AB889B7B_8BE6_63FE_41E0_FBA1ED7D1692",
            "easing": "cubic_in"
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.43,
            "id": "popup_B48375B0_939A_0A20_412C_1031470ADF80",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B48375B0_939A_0A20_412C_1031470ADF80_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 720,
                        "height": 1024
                    }
                ]
            },
            "pitch": 6.48,
            "yaw": -59.53,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 100,
            "manualZoomSpeed": 8,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -2.83,
                "pitch": 0
            },
            "initialSequence": "this.sequence_BA5C417F_A64C_A776_41E1_F6BB2EDDE498",
            "id": "camera_BA5C517F_A64C_A776_41C1_4EC1D3D53C20"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_9CA53037_93FB_A2F9_41C1_ACAF1C3EC0E5",
            "levels": [
                {
                    "url": "media/popup_B1C90B24_93A6_3E21_41BA_25E3AC870408_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2651,
                    "height": 3750
                },
                {
                    "url": "media/popup_B1C90B24_93A6_3E21_41BA_25E3AC870408_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1447,
                    "height": 2048
                },
                {
                    "url": "media/popup_B1C90B24_93A6_3E21_41BA_25E3AC870408_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                }
            ]
        },
        {
            "adjacentPanoramas": [
                {
                    "class": "AdjacentPanorama",
                    "yaw": 177.17,
                    "backwardYaw": 177.73,
                    "distance": 1,
                    "panorama": "this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E"
                }
            ],
            "hfov": 360,
            "label": "IMG_20260414_131641_00_111",
            "id": "panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6",
            "thumbnailUrl": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_t.jpg",
            "cardboardMenu": "this.Menu_BB7F50D4_A64C_A589_41DD_7ED2F5A87D7B",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/f/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/f/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/f/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/f/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/u/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/u/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/u/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/u/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/r/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/r/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/r/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/r/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/b/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/b/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/b/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/b/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/d/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/d/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/d/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/d/3/{row}_{column}.jpg",
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
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/l/0/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 8,
                                "tags": "ondemand",
                                "colCount": 8,
                                "width": 4096,
                                "height": 4096
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/l/1/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 4,
                                "tags": "ondemand",
                                "colCount": 4,
                                "width": 2048,
                                "height": 2048
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/l/2/{row}_{column}.jpg",
                                "class": "TiledImageResourceLevel",
                                "rowCount": 2,
                                "tags": "ondemand",
                                "colCount": 2,
                                "width": 1024,
                                "height": 1024
                            },
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0/l/3/{row}_{column}.jpg",
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
                    "thumbnailUrl": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_t.jpg"
                }
            ],
            "vfov": 180,
            "mapLocations": [
                {
                    "map": "this.map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D",
                    "class": "PanoramaMapLocation",
                    "angle": -172.7,
                    "y": 5446.17,
                    "x": 1975.03
                }
            ],
            "overlays": [
                "this.overlay_9CB4CF9E_8EF7_1433_41D3_84543E7BE1A0",
                "this.popup_9CF8BF7A_929E_3620_41DE_3297780BDEF2",
                "this.overlay_9D2C5EEB_929E_3620_41C4_B0A360B46E9A",
                "this.overlay_B587354F_93AA_0A7F_41D0_FFAF1134A38B",
                "this.overlay_B587054F_93AA_0A7F_41D4_06F59EC87A73",
                "this.overlay_B587654F_93AA_0A7F_41D1_CD24F6A77F4C",
                "this.overlay_B587954F_93AA_0A7F_41C2_3298F8B67310",
                "this.overlay_B587F54F_93AA_0A7F_41D3_8636B87CDFBE",
                "this.popup_B5B68516_93AA_0BE1_41D4_53B43D537506",
                "this.popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B",
                "this.popup_B5B5B519_93AA_0BE0_41DF_D1FD0768A629",
                "this.popup_B5BA951A_93AA_0BE0_41D2_084175A0CDC3",
                "this.popup_B5B8351B_93AA_0BE0_41BF_9BECF6041723",
                "this.popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE",
                "this.popup_BADC57FC_939E_3620_41D3_760439B2FF2A",
                "this.popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2",
                "this.overlay_B2390D8B_A351_CBC6_41DD_254E77A8D9EA",
                "this.overlay_92172FD5_87FD_A121_41BD_47028CDF509C",
                "this.overlay_B9A4EC96_A372_C9CE_41E2_C27481020D61",
                "this.overlay_BF34A7B9_A37E_47C5_41D8_11ECCD7F9C36"
            ]
        },
        {
            "class": "PanoramaCamera",
            "automaticZoomSpeed": 10,
            "initialPosition": {
                "class": "PanoramaCameraPosition",
                "yaw": -15.96,
                "pitch": 0
            },
            "initialSequence": {
                "class": "PanoramaCameraSequence",
                "movements": [
                    {
                        "targetYaw": -16.05,
                        "class": "TargetPanoramaCameraMovement",
                        "targetHfov": 90,
                        "hfovSpeed": 1.78,
                        "path": "longest",
                        "targetPitch": -4.34,
                        "yawSpeed": 1.78,
                        "easing": "cubic_in_out",
                        "pitchSpeed": 1.39
                    },
                    {
                        "targetYaw": 163.76,
                        "class": "TargetPanoramaCameraMovement",
                        "targetHfov": 90,
                        "hfovSpeed": 33.25,
                        "path": "shortest",
                        "targetPitch": -0.09,
                        "yawSpeed": 33.25,
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.05
                    },
                    {
                        "targetYaw": -15.96,
                        "class": "TargetPanoramaCameraMovement",
                        "targetHfov": 90,
                        "hfovSpeed": 33.22,
                        "path": "longest",
                        "targetPitch": 0,
                        "yawSpeed": 33.22,
                        "easing": "cubic_in_out",
                        "pitchSpeed": 17.04
                    }
                ],
                "repeat": 0,
                "restartMovementOnUserInteraction": false
            },
            "id": "camera_BB99C122_A64C_A48E_41DA_EB3348768129"
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_B8B99C1B_93AE_19E0_41C5_BA76E336BEAE",
            "levels": [
                {
                    "url": "media/popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2651,
                    "height": 3750
                },
                {
                    "url": "media/popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1447,
                    "height": 2048
                },
                {
                    "url": "media/popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 723,
                    "height": 1024
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.66,
            "id": "popup_B6374988_93BE_1AE0_41C6_CF8C6296A399",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B6374988_93BE_1AE0_41C6_CF8C6296A399_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 791,
                        "height": 1024
                    }
                ]
            },
            "pitch": 8.37,
            "yaw": -120.72,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "ImageResource",
            "id": "ImageResource_0C9D89E1_19BC_C45D_41B9_574CFF5E7A39",
            "levels": [
                {
                    "url": "media/popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1_0_0.png",
                    "class": "ImageResourceLevel",
                    "width": 2652,
                    "height": 3750
                },
                {
                    "url": "media/popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1_0_1.png",
                    "class": "ImageResourceLevel",
                    "width": 1448,
                    "height": 2048
                },
                {
                    "url": "media/popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1_0_2.png",
                    "class": "ImageResourceLevel",
                    "width": 724,
                    "height": 1024
                },
                {
                    "url": "media/popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1_0_3.png",
                    "class": "ImageResourceLevel",
                    "width": 362,
                    "height": 512
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.45,
            "id": "popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 724,
                        "height": 1024
                    }
                ]
            },
            "pitch": 5.73,
            "yaw": -141.21,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "class": "PlayList",
            "items": [
                {
                    "class": "VideoPlayListItem",
                    "start": "this.viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_BB7D70D1_A64C_A58B_4199_25812A35B8EB, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_BB7D70D1_A64C_A58B_4199_25812A35B8EB, 0)",
                    "begin": "this.fixTogglePlayPauseButton(this.viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393VideoPlayer)",
                    "media": "this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E",
                    "player": "this.viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393VideoPlayer"
                }
            ],
            "id": "PlayList_BB7D70D1_A64C_A58B_4199_25812A35B8EB"
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
            "paddingLeft": 15,
            "scrollBarColor": "#000000",
            "paddingRight": 0,
            "children": [
                "this.Image_81A5741F_A3EE_D8FD_41BE_74D743C1DCDD"
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
                "name": "UIComponent9679"
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
                "name": "ZoomImage9680"
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
                "name": "CloseButton9681"
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
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FF",
            "id": "viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FFVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_BB7C80CD_A64C_A59B_41DD_E2D809E643DB, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
            "media": "this.panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_BB7C80CD_A64C_A59B_41DD_E2D809E643DB"
        },
        {
            "class": "PanoramaPlayListItem",
            "camera": "this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_BB7C70CD_A64C_A59B_41D7_479A353440A7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
            "media": "this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_BB7C70CD_A64C_A59B_41D7_479A353440A7"
        },
        {
            "class": "PanoramaPlayListItem",
            "end": "this.trigger('tourEnded')",
            "camera": "this.panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_camera",
            "begin": "this.setMapLocation(this.PanoramaPlayListItem_BB7DA0CE_A64C_A599_41E1_4D409BBE047F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 0)",
            "media": "this.panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2",
            "player": "this.MainViewerPanoramaPlayer",
            "id": "PanoramaPlayListItem_BB7DA0CE_A64C_A599_41E1_4D409BBE047F"
        },
        {
            "class": "PanoramaCameraSequence",
            "restartMovementOnUserInteraction": false,
            "id": "sequence_BB3CF87E_A30E_0D1B_41D8_BE10759F5A54",
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
        {
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BE",
            "id": "viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BEVideoPlayer",
            "displayPlaybackBar": true
        },
        {
            "map": {
                "width": 75.86,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_0_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 807.55,
                "x": 638.89,
                "offsetY": 0,
                "height": 75.86,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 75.86,
                "y": 807.55,
                "width": 75.86,
                "x": 637.75,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_0.png",
                            "class": "ImageResourceLevel",
                            "width": 75,
                            "height": 75
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 1); this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)"
                }
            ],
            "id": "overlay_3503EDD9_27FF_ADC5_41A5_B1A247584343",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 75.86,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_1_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 119.09,
                "x": 622.08,
                "offsetY": 0,
                "height": 75.86,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 75.86,
                "y": 119.09,
                "width": 75.86,
                "x": 620.94,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_1.png",
                            "class": "ImageResourceLevel",
                            "width": 75,
                            "height": 75
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 2); this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)"
                }
            ],
            "id": "overlay_3503CDD9_27FF_ADC5_41B1_94E3014DF513",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 75.86,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_2_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 1705.27,
                "x": 595.3,
                "offsetY": 0,
                "height": 75.86,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": false,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 75.86,
                "y": 1705.27,
                "width": 75.86,
                "x": 594.16,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_33F075D6_27F8_DDCF_4164_A44E579042FA_HS_2.png",
                            "class": "ImageResourceLevel",
                            "width": 75,
                            "height": 75
                        }
                    ]
                }
            },
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotMapOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.mainPlayList.set('selectedIndex', 0); this.setComponentVisibility(this.Container_37D6AD51_27F9_B2C5_41A2_C4C8DEAB890B, false, 0, null, null, false)"
                }
            ],
            "id": "overlay_3503DDD9_27FF_ADC5_41BD_5860DB3EC18D",
            "data": {
                "label": "Image"
            }
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uidBB76E0C1_A64C_A58A_41E1_B489B6DA93FF",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "playbackBarBottom": 0,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#003366",
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
            "toolTipFontSize": "1.11vmin",
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
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "displayTooltipInTouchScreens": true,
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
            "playbackBarHeadHeight": 15,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "progressBackgroundColorRatios": [
                0
            ],
            "toolTipBorderRadius": 3,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 500,
            "data": {
                "name": "ViewerArea9677"
            }
        },
        {
            "map": {
                "width": 237,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_3_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 2523.19,
                "x": 1996.73,
                "offsetY": 0,
                "height": 237,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 237,
                "y": 2523.19,
                "width": 237,
                "x": 1992.73,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_3.png",
                            "class": "ImageResourceLevel",
                            "width": 121,
                            "height": 121
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
            "id": "overlay_3F1E8254_1B74_A4A4_4186_00B544CE86B3",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 237,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_4_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 372.09,
                "x": 1944.21,
                "offsetY": 0,
                "height": 237,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 237,
                "y": 372.09,
                "width": 237,
                "x": 1940.21,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_4.png",
                            "class": "ImageResourceLevel",
                            "width": 121,
                            "height": 121
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
            "id": "overlay_3F5DAABF_1B75_A5E3_4198_0DE31D65A828",
            "data": {
                "label": "Image"
            }
        },
        {
            "map": {
                "width": 237,
                "class": "HotspotMapOverlayMap",
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_5_map.gif",
                            "class": "ImageResourceLevel",
                            "width": 16,
                            "height": 16
                        }
                    ]
                },
                "y": 5327.67,
                "x": 1860.53,
                "offsetY": 0,
                "height": 237,
                "offsetX": 0
            },
            "class": "AreaHotspotMapOverlay",
            "rollOverDisplay": true,
            "image": {
                "class": "HotspotMapOverlayImage",
                "height": 237,
                "y": 5327.67,
                "width": 237,
                "x": 1856.53,
                "image": {
                    "class": "ImageResource",
                    "levels": [
                        {
                            "url": "media/map_9EFAFA30_BEF1_0E4E_41D6_039B090E127D_HS_5.png",
                            "class": "ImageResourceLevel",
                            "width": 121,
                            "height": 121
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
            "id": "overlay_3F0E1248_1B74_64AD_41B1_18F8BC0B8A32",
            "data": {
                "label": "Image"
            }
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "playbackBarBottom": 0,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#003366",
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
            "toolTipFontSize": "1.11vmin",
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
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "displayTooltipInTouchScreens": true,
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
            "playbackBarHeadHeight": 15,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "progressBackgroundColorRatios": [
                0
            ],
            "toolTipBorderRadius": 3,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 500,
            "data": {
                "name": "ViewerArea9676"
            }
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
            "toolTipFontSize": "1.65vmin",
            "toolTipOpacity": 1,
            "toolTipShadowBlurRadius": 3,
            "playbackBarHeight": 10,
            "playbackBarBackgroundColorDirection": "vertical",
            "toolTipTextShadowColor": "#000000",
            "playbackBarBackgroundColor": [
                "#FFFFFF"
            ],
            "playbackBarHeadWidth": 6,
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
            "height": "80%",
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
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "bottom": "8.86%",
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
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.47,
            "id": "popup_091B8811_19A3_43FA_417B_860E816A49B1",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_091B8811_19A3_43FA_417B_860E816A49B1_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 724,
                        "height": 1024
                    }
                ]
            },
            "pitch": 3.45,
            "yaw": -173.85,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.45,
            "id": "popup_09152819_19A3_43EA_41B8_7696E6AD3203",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_09152819_19A3_43EA_41B8_7696E6AD3203_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 5.01,
            "yaw": -167.86,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.45,
            "id": "popup_09157819_19A3_43EA_41B3_E078E7E34CB6",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_09157819_19A3_43EA_41B3_E078E7E34CB6_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 6.67,
            "yaw": -155.59,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.45,
            "id": "popup_0915A819_19A3_43EA_41B8_FB3734F1591E",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_0915A819_19A3_43EA_41B8_FB3734F1591E_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 7.75,
            "yaw": -147.74,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.45,
            "id": "popup_0915E81B_19A3_43ED_4192_522F66AE8B97",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_0915E81B_19A3_43ED_4192_522F66AE8B97_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 7.62,
            "yaw": -137.48,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            },
            "hfov": 7.99,
            "autoplay": false,
            "id": "overlay_9F4A9C9E_8EF7_1430_41D8_0A2BF711EDED",
            "enabledInCardboard": true,
            "loop": true,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_9F4A9C9E_8EF7_1430_41D8_0A2BF711EDED_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 3.25,
            "useHandCursor": true,
            "roll": -1.2,
            "yaw": 166.67,
            "rotationY": -8.66,
            "class": "VideoPanoramaOverlay",
            "rotationX": 1.16,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_9DA4A71B_929E_17E0_41A7_61244A9EE49F, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_BA75F68E_A64B_AD96_41DB_8F82EA5FEC0F, this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E, this.PlayList_BB7E30D2_A64C_A589_41DC_C387892C1FDE, '95%', '95%', true, true) }; this.overlay_9F4A9C9E_8EF7_1430_41D8_0A2BF711EDED.play()",
            "videoVisibleOnStop": false,
            "data": {
                "label": "Video"
            },
            "vfov": 4.53,
            "distance": 50
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E, this.camera_BB92710B_A64C_A49E_41DF_1A958EA19F56); this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 8.71,
                    "image": "this.AnimatedImageResource_84CA28E9_92AE_1A20_41DF_BA3B321F8E20",
                    "pitch": -19.79,
                    "yaw": 164.04,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_9DE67A0A_929A_19E0_41D2_3D407C7B14F4",
            "maps": [
                {
                    "hfov": 8.71,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 164.04,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_8_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -19.79
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
                    "toolTip": "Sanksi Peminjaman Alat",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B1C73B1E_93A6_3FE1_41A8_BE0A57EE465B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B1C72B1E_93A6_3FE1_41DC_EFBCDB721EEC, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.47,
                    "image": "this.AnimatedImageResource_B8432BF4_93AE_1E21_41E1_76A53B923B82",
                    "pitch": 3.84,
                    "yaw": -174.01,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B0350B86_93A6_3EE1_41AD_46E5625279B9",
            "maps": [
                {
                    "hfov": 3.47,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -174.01,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_10_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 3.84
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
                    "toolTip": "Daftar Inventaris Ruangan (DIR)",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B1C98B22_93A6_3E21_41D1_203AC7EF99CE, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA47036_93FB_A2FB_41D3_4F52BE98BB5B, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.47,
                    "image": "this.AnimatedImageResource_B8431BF4_93AE_1E21_41D9_B37CEA49DAFA",
                    "pitch": 4.83,
                    "yaw": -167.79,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B036FB88_93A6_3EE0_41DC_6A83BA8FB80E",
            "maps": [
                {
                    "hfov": 3.47,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -167.79,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_11_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 4.83
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
                    "toolTip": "Deskripsi Tugas Teknisi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_9D12DC01_9386_6299_41C2_6D25A6874E02, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA59037_93FB_A2F9_41D5_524EE3121EDB, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.46,
                    "image": "this.AnimatedImageResource_B843BBF4_93AE_1E21_41D1_2D3DAD457466",
                    "pitch": 6.46,
                    "yaw": -155.55,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B036EB88_93A6_3EE0_41E1_142FFF18B47F",
            "maps": [
                {
                    "hfov": 3.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -155.55,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_12_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 6.46
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
                    "toolTip": "Deskripsi Tugas Kepala Laboratorium",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B1C90B24_93A6_3E21_41BA_25E3AC870408, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA53037_93FB_A2F9_41C1_ACAF1C3EC0E5, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.45,
                    "image": "this.AnimatedImageResource_B84C2BF4_93AE_1E21_41D8_AEF7F895FB1A",
                    "pitch": 7.29,
                    "yaw": -147.75,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B036FB89_93A6_3EE0_41D7_79A03DE40C95",
            "maps": [
                {
                    "hfov": 3.45,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -147.75,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_13_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 7.29
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
                    "toolTip": "Deskripsi Tugas Kepala Laboratorium",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B4DD1630_939E_1620_41B0_ED7A75D03FB5, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_BE7CAC02_939A_19E0_4194_A090775A92D6, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.45,
                    "image": "this.AnimatedImageResource_B84C0BF4_93AE_1E21_41D2_13C4E1911B12",
                    "pitch": 7.23,
                    "yaw": -137.2,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B036EB89_93A6_3EE0_41BD_46B9D40FE475",
            "maps": [
                {
                    "hfov": 3.45,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -137.2,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_14_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 7.23
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.46,
            "id": "popup_B1C94B23_93A6_3E27_41E1_8092BD84E36C",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B1C94B23_93A6_3E27_41E1_8092BD84E36C_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 889
                    }
                ]
            },
            "pitch": 6.46,
            "yaw": -155.55,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.44,
            "id": "popup_B1CACB26_93A6_3E20_41E0_0580BAF27CC7",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B1CACB26_93A6_3E20_41E0_0580BAF27CC7_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 7.23,
            "yaw": -137.2,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": true,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "roll": 0,
                    "hfov": 20.38,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_15_0.png",
                                "class": "ImageResourceLevel",
                                "width": 681,
                                "height": 417
                            }
                        ]
                    },
                    "pitch": 32.2,
                    "yaw": 101.43
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_B89B8EC0_A372_4942_41A5_56D9576DDD16",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 20.38,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 101.43,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_15_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 122
                            }
                        ]
                    },
                    "pitch": 32.2
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
                    "hfov": 5.65,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_16_0.png",
                                "class": "ImageResourceLevel",
                                "width": 187,
                                "height": 170
                            }
                        ]
                    },
                    "pitch": 15.58,
                    "yaw": 140.71
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_B9F29A6E_A372_495E_41E3_D1B83001F616",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 5.65,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 140.71,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_16_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 93,
                                "height": 85
                            }
                        ]
                    },
                    "pitch": 15.58
                }
            ]
        },
        {
            "progressBarBorderColor": "#000000",
            "progressBackgroundColorDirection": "vertical",
            "id": "viewer_uidBB7820C5_A64C_A58A_41D7_8B217C80C8BE",
            "progressBarBackgroundColorRatios": [
                0
            ],
            "playbackBarBottom": 0,
            "paddingLeft": 0,
            "playbackBarHeadOpacity": 1,
            "progressBorderColor": "#003366",
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
            "toolTipFontSize": "1.11vmin",
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
            "playbackBarProgressBackgroundColor": [
                "#3399FF"
            ],
            "playbackBarOpacity": 1,
            "displayTooltipInTouchScreens": true,
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
            "playbackBarHeadHeight": 15,
            "borderRadius": 0,
            "playbackBarHeadShadowBlurRadius": 3,
            "progressBackgroundColorRatios": [
                0
            ],
            "toolTipBorderRadius": 3,
            "playbackBarHeadBackgroundColorRatios": [
                0,
                1
            ],
            "transitionDuration": 500,
            "data": {
                "name": "ViewerArea9678"
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
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Sanksi Peminjaman Alat",
                    "click": "this.showPopupPanoramaOverlay(this.popup_0BE2FE5E_19A4_BC67_41A0_D1179E92BBE1, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_0C9D89E1_19BC_C45D_41B9_574CFF5E7A39, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.46,
                    "image": "this.AnimatedImageResource_08B29E38_19AD_5C2B_41A2_34A363FA48B2",
                    "pitch": 5.73,
                    "yaw": -141.21,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_094AB12E_19AC_C427_4184_558E15996828",
            "maps": [
                {
                    "hfov": 3.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -141.21,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_4_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 5.73
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
                    "toolTip": "Daftar Inventaris Ruangan (DIR)",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B6374988_93BE_1AE0_41C6_CF8C6296A399, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B8BFEC18_93AE_19E1_41C5_253D7B3C1A30, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.44,
                    "image": "this.AnimatedImageResource_08B3AE38_19AD_5C2B_41A4_BE782B4CBFCF",
                    "pitch": 8.37,
                    "yaw": -120.72,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_094AA12E_19AC_C427_41B7_D54BC612F322",
            "maps": [
                {
                    "hfov": 3.44,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -120.72,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_5_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 8.37
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
                    "toolTip": "Deskripsi Tugas Teknisi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_9D790A11_9387_E6B9_4172_A8EC5A32DB70, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA37031_93FB_A2F9_41D8_9F913C42AC24, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.43,
                    "image": "this.AnimatedImageResource_08B3EE38_19AD_5C2B_41B0_D14FF51DE960",
                    "pitch": 9.52,
                    "yaw": -85.47,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_094A912E_19AC_C427_41B9_56DCEF9E054C",
            "maps": [
                {
                    "hfov": 3.43,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -85.47,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_6_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 9.52
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
                    "toolTip": "Deskripsi Tugas Kepala Laboratorium",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B7CAC660_93BA_1621_41DD_128B6D6E99F7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B8B99C1B_93AE_19E0_41C5_BA76E336BEAE, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.44,
                    "image": "this.AnimatedImageResource_08B3DE38_19AD_5C2B_41A3_E923C4326BC6",
                    "pitch": 8.6,
                    "yaw": -71.64,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_094A812E_19AC_C427_4152_907AE9A120B0",
            "maps": [
                {
                    "hfov": 3.44,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -71.64,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_7_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 8.6
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
                    "toolTip": "Deskripsi Tugas Kepala Laboratorium",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B48375B0_939A_0A20_412C_1031470ADF80, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_BE068BEE_939A_1E20_41DA_CF29A87E4064, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.46,
                    "image": "this.AnimatedImageResource_08B37E38_19AD_5C2B_41B4_61BE71D5455D",
                    "pitch": 6.48,
                    "yaw": -59.53,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_094A712E_19AC_C427_41B6_2B80DC54BF1D",
            "maps": [
                {
                    "hfov": 3.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -59.53,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_8_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 6.48
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.44,
            "id": "popup_0946F10E_19AC_C5E7_41AB_8B05418F03C2",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_0946F10E_19AC_C5E7_41AB_8B05418F03C2_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 724,
                        "height": 1024
                    }
                ]
            },
            "pitch": 8.37,
            "yaw": -120.72,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.43,
            "id": "popup_0946B10E_19AC_C5E7_4177_479386C984F9",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_0946B10E_19AC_C5E7_4177_479386C984F9_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 9.52,
            "yaw": -85.47,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            },
            "hfov": 13.7,
            "autoplay": true,
            "id": "overlay_9DB23AAE_8EF1_3C10_41DF_99F687786B80",
            "enabledInCardboard": true,
            "loop": true,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_9DB23AAE_8EF1_3C10_41DF_99F687786B80_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 5.45,
            "useHandCursor": true,
            "roll": -1.2,
            "yaw": -177.51,
            "rotationY": -2.08,
            "class": "VideoPanoramaOverlay",
            "rotationX": -0.73,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_9F05FBEE_929A_3E21_41C9_A8F74D442B93, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_BA75B68D_A64B_AD9A_41D7_1B8F68553DC9, this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E, this.PlayList_BB7E90D2_A64C_A589_41DF_9D66E24D7FDF, '95%', '95%', true, true) }",
            "videoVisibleOnStop": false,
            "data": {
                "label": "Video"
            },
            "vfov": 8.03,
            "distance": 50
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2, this.camera_BB99C122_A64C_A48E_41DA_EB3348768129); this.mainPlayList.set('selectedIndex', 2)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 6.42,
                    "image": "this.AnimatedImageResource_84C988E2_92AE_1A21_41B9_57417E44F5F2",
                    "pitch": -17.27,
                    "yaw": -5.65,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_9C2BD372_929E_0E20_41D8_19B1D8EADD1E",
            "maps": [
                {
                    "hfov": 6.42,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -5.65,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_9_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -17.27
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
                    "click": "this.startPanoramaWithCamera(this.panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6, this.camera_BA5C517F_A64C_A776_41C1_4EC1D3D53C20); this.mainPlayList.set('selectedIndex', 0)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 10.99,
                    "image": "this.AnimatedImageResource_84C948E2_92AE_1A21_41DE_09C32E525A38",
                    "pitch": -21.4,
                    "yaw": 177.73,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 50
                }
            ],
            "id": "overlay_9C581470_929A_0A21_41BB_C10A4626DF01",
            "maps": [
                {
                    "hfov": 10.99,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 177.73,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_10_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -21.4
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "class": "HotspotPanoramaOverlayImage",
                    "hfov": 35.67,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_13_0.png",
                                "class": "ImageResourceLevel",
                                "width": 1181,
                                "height": 236
                            }
                        ]
                    },
                    "pitch": 2.9,
                    "yaw": -5.29
                }
            ],
            "useHandCursor": true,
            "enabled": false,
            "areas": [
                {
                    "mapColor": "#FF0000",
                    "class": "HotspotPanoramaOverlayArea"
                }
            ],
            "id": "overlay_83221801_93FA_6299_41E0_6FA800452E66",
            "data": {
                "label": "labkom vr"
            },
            "maps": [
                {
                    "hfov": 35.67,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -5.29,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_13_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 80,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 2.9
                }
            ]
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 12.77,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_14_0.png",
                                "class": "ImageResourceLevel",
                                "width": 422,
                                "height": 106
                            }
                        ]
                    },
                    "pitch": -3.29,
                    "yaw": -148.9,
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
            "id": "overlay_B107203F_A351_D93D_41E0_A40162F100B7",
            "data": {
                "label": "Pintu Keluar"
            },
            "maps": [
                {
                    "hfov": 12.77,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -148.9,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_14_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 63,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -3.29
                }
            ]
        },
        {
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Pintu Keluar",
                    "click": "this.openLink('../index.htm?media-name=IMG_20260427_121737_00_021', '_self')"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 10.14,
                    "image": "this.AnimatedImageResource_BBF6B34D_A356_BF42_41D9_21C965A7765F",
                    "pitch": 0.77,
                    "yaw": -149.48,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B1077040_A351_D943_41D2_C30431C0FCA8",
            "maps": [
                {
                    "hfov": 10.14,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -149.48,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_15_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 0.77
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
                    "hfov": 19.25,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_17_0.png",
                                "class": "ImageResourceLevel",
                                "width": 642,
                                "height": 400
                            }
                        ]
                    },
                    "pitch": 34.28,
                    "yaw": 110.87
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_B486C22F_A372_58DE_41D0_9113BF65C6F8",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 19.25,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 110.87,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_17_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 200,
                                "height": 124
                            }
                        ]
                    },
                    "pitch": 34.28
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
                    "hfov": 11.44,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_18_0.png",
                                "class": "ImageResourceLevel",
                                "width": 379,
                                "height": 316
                            }
                        ]
                    },
                    "pitch": 22.76,
                    "yaw": 30.22
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_B58F36B8_A371_B9C3_41CF_73F1DFC60335",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 11.44,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 30.22,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_18_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 189,
                                "height": 158
                            }
                        ]
                    },
                    "pitch": 22.76
                }
            ]
        },
        {
            "class": "PanoramaCameraSequence",
            "restartMovementOnUserInteraction": false,
            "id": "sequence_BA5C417F_A64C_A776_41E1_F6BB2EDDE498",
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
        {
            "blending": 0,
            "video": {
                "width": 1270,
                "class": "VideoResource",
                "height": 726,
                "mp4Url": "media/video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E.mp4"
            },
            "hfov": 62.44,
            "autoplay": true,
            "id": "overlay_9CB4CF9E_8EF7_1433_41D3_84543E7BE1A0",
            "enabledInCardboard": true,
            "loop": true,
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/overlay_9CB4CF9E_8EF7_1433_41D3_84543E7BE1A0_t.jpg",
                        "class": "ImageResourceLevel",
                        "width": 2964,
                        "height": 1694
                    }
                ]
            },
            "pitch": 21.15,
            "useHandCursor": true,
            "roll": -8.52,
            "yaw": 19,
            "rotationY": 20.38,
            "class": "VideoPanoramaOverlay",
            "rotationX": -17.67,
            "toolTip": "Klik untuk Putar Video",
            "videoVisibleOnStop": false,
            "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_9CF8BF7A_929E_3620_41DE_3297780BDEF2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_BA75468C_A64B_AD9A_41D1_308FCD48126B, this.video_9F7B6566_8EF1_F410_41D5_4EA39488DD2E, this.PlayList_BB7D70D1_A64C_A58B_4199_25812A35B8EB, '95%', '95%', true, true) }",
            "data": {
                "label": "Video"
            },
            "vfov": 37.47,
            "distance": 50
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "click": "this.startPanoramaWithCamera(this.panorama_B8976067_B63F_4C4D_41D4_82276E08E98E, this.camera_BA419193_A64C_A78E_41B4_666FD9B49D93); this.mainPlayList.set('selectedIndex', 1)"
                }
            ],
            "data": {
                "label": "Arrow 01b"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 15.83,
                    "image": "this.AnimatedImageResource_84CCB8E1_92AE_1A23_41C7_83A2BEFF6CBF",
                    "pitch": -21.34,
                    "yaw": 177.17,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_9D2C5EEB_929E_3620_41C4_B0A360B46E9A",
            "maps": [
                {
                    "hfov": 15.83,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 177.17,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_10_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 26,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -21.34
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
                    "toolTip": "Sanksi Peminjaman Alat",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B5B68516_93AA_0BE1_41D4_53B43D537506, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_B5B6E516_93AA_0BE1_41E0_860EAFD6937B, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.46,
                    "image": "this.AnimatedImageResource_B844ABEA_93AE_1E20_41D1_7F049FC3D8FA",
                    "pitch": 6.36,
                    "yaw": 105.86,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B587354F_93AA_0A7F_41D0_FFAF1134A38B",
            "maps": [
                {
                    "hfov": 3.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 105.86,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_11_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 6.36
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
                    "toolTip": "Daftar Inventaris Ruangan (DIR)",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B5B4A517_93AA_0BEF_41DC_17D3597EEA9B, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA1602D_93FB_A2E9_41DB_0A340A43FAA9, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 3.46,
                    "image": "this.AnimatedImageResource_B8457BEB_93AE_1E27_418E_6DB71F114D05",
                    "pitch": 5.42,
                    "yaw": 130.77,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B587054F_93AA_0A7F_41D4_06F59EC87A73",
            "maps": [
                {
                    "hfov": 3.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 130.77,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_12_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 5.42
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
                    "toolTip": "Deskripsi Tugas Teknisi",
                    "click": "this.showPopupPanoramaOverlay(this.popup_9DEEB0C7_9386_A399_41E2_4094E3F543D2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9CA2802E_93FB_A2EB_41CB_026925B045E1, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 2.86,
                    "image": "this.AnimatedImageResource_B8455BEB_93AE_1E27_41D6_361E1AFD552C",
                    "pitch": 4.22,
                    "yaw": 145.8,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B587654F_93AA_0A7F_41D1_CD24F6A77F4C",
            "maps": [
                {
                    "hfov": 2.86,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 145.8,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_13_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 4.22
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
                    "toolTip": "Struktur Organisasi Laboratorium Komputer Ffkip\u000aUNIVERSITAS LAMPUNG",
                    "click": "this.showPopupPanoramaOverlay(this.popup_BADC57FC_939E_3620_41D3_760439B2FF2A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_BE0D1BE5_939A_1E20_41B5_3CD7E300DB96, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 2.73,
                    "image": "this.AnimatedImageResource_9CF9F004_93FB_A29F_41B4_31BBACF640A5",
                    "pitch": 3.47,
                    "yaw": 149.42,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B587954F_93AA_0A7F_41C2_3298F8B67310",
            "maps": [
                {
                    "hfov": 2.73,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 149.42,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_14_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 3.47
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
                    "toolTip": "Deskripsi Tugas Kepala Laboratorium",
                    "click": "this.showPopupPanoramaOverlay(this.popup_B43F3E1A_939A_19E0_41C7_F335B9031AFE, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_BE0A7BE6_939A_1E20_41C6_7BADF5231048, null, null, null, null, false)"
                }
            ],
            "data": {
                "label": "Info 02"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 2.46,
                    "image": "this.AnimatedImageResource_B845BBEB_93AE_1E27_41B3_A3C65912C67F",
                    "pitch": 2.54,
                    "yaw": 152.71,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_B587F54F_93AA_0A7F_41D3_8636B87CDFBE",
            "maps": [
                {
                    "hfov": 2.46,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 152.71,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_15_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": 2.54
                }
            ]
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 2.86,
            "id": "popup_B5B5B519_93AA_0BE0_41DF_D1FD0768A629",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B5B5B519_93AA_0BE0_41DF_D1FD0768A629_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 1024,
                        "height": 889
                    }
                ]
            },
            "pitch": 4.22,
            "yaw": 145.8,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 3.47,
            "id": "popup_B5BA951A_93AA_0BE0_41D2_084175A0CDC3",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B5BA951A_93AA_0BE0_41D2_084175A0CDC3_0_1.png",
                        "class": "ImageResourceLevel",
                        "width": 769,
                        "height": 1024
                    }
                ]
            },
            "pitch": 3.63,
            "yaw": 149.36,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "rotationY": 0,
            "class": "PopupPanoramaOverlay",
            "popupMaxWidth": "95%",
            "showDuration": 500,
            "showEasing": "cubic_in",
            "hfov": 1.99,
            "id": "popup_B5B8351B_93AA_0BE0_41BF_9BECF6041723",
            "rotationX": 0,
            "rotationZ": 0,
            "hideEasing": "cubic_out",
            "popupMaxHeight": "95%",
            "image": {
                "class": "ImageResource",
                "levels": [
                    {
                        "url": "media/popup_B5B8351B_93AA_0BE0_41BF_9BECF6041723_0_2.png",
                        "class": "ImageResourceLevel",
                        "width": 723,
                        "height": 1024
                    }
                ]
            },
            "pitch": 2.54,
            "yaw": 152.71,
            "hideDuration": 500,
            "popupDistance": 100
        },
        {
            "enabledInCardboard": true,
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "items": [
                {
                    "hfov": 12.53,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_16_0.png",
                                "class": "ImageResourceLevel",
                                "width": 421,
                                "height": 109
                            }
                        ]
                    },
                    "pitch": -10.53,
                    "yaw": 85.65,
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
            "id": "overlay_B2390D8B_A351_CBC6_41DD_254E77A8D9EA",
            "data": {
                "label": "Pintu Keluar"
            },
            "maps": [
                {
                    "hfov": 12.53,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 85.65,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_16_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 61,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -10.53
                }
            ]
        },
        {
            "class": "HotspotPanoramaOverlay",
            "rollOverDisplay": false,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "Pintu Keluar",
                    "click": "this.openLink('../index.htm?media-name=IMG_20260427_121737_00_021', '_self')"
                }
            ],
            "data": {
                "label": "Image"
            },
            "useHandCursor": true,
            "items": [
                {
                    "hfov": 11.41,
                    "image": "this.AnimatedImageResource_907EDC59_87FC_6720_41B1_A97F13807C74",
                    "pitch": -3.72,
                    "yaw": 85.05,
                    "class": "HotspotPanoramaOverlayImage",
                    "distance": 100
                }
            ],
            "id": "overlay_92172FD5_87FD_A121_41BD_47028CDF509C",
            "maps": [
                {
                    "hfov": 11.41,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": 85.05,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_8_0_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 16,
                                "height": 16
                            }
                        ]
                    },
                    "pitch": -3.72
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
                    "hfov": 8.27,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_17_0.png",
                                "class": "ImageResourceLevel",
                                "width": 274,
                                "height": 222
                            }
                        ]
                    },
                    "pitch": 17.47,
                    "yaw": -152.61
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_B9A4EC96_A372_C9CE_41E2_C27481020D61",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 8.27,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -152.61,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_17_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 137,
                                "height": 111
                            }
                        ]
                    },
                    "pitch": 17.47
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
                    "hfov": 3.87,
                    "distance": 50,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_18_0.png",
                                "class": "ImageResourceLevel",
                                "width": 128,
                                "height": 117
                            }
                        ]
                    },
                    "pitch": 9.73,
                    "yaw": -167.72
                }
            ],
            "useHandCursor": true,
            "areas": [
                {
                    "class": "HotspotPanoramaOverlayArea",
                    "mapColor": "#FF0000",
                    "toolTip": "AC (Air Conditioner)"
                }
            ],
            "id": "overlay_BF34A7B9_A37E_47C5_41D8_11ECCD7F9C36",
            "data": {
                "label": "Polygon"
            },
            "maps": [
                {
                    "hfov": 3.87,
                    "class": "HotspotPanoramaOverlayMap",
                    "yaw": -167.72,
                    "image": {
                        "class": "ImageResource",
                        "levels": [
                            {
                                "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_18_1_0_map.gif",
                                "class": "ImageResourceLevel",
                                "width": 64,
                                "height": 58
                            }
                        ]
                    },
                    "pitch": 9.73
                }
            ]
        },
        {
            "class": "VideoPlayer",
            "viewerArea": "this.viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393",
            "id": "viewer_uidBB7250BA_A64C_A5FE_41E0_1758D8BF3393VideoPlayer",
            "displayPlaybackBar": true
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
            "id": "Image_81A5741F_A3EE_D8FD_41BE_74D743C1DCDD",
            "left": "0%",
            "paddingRight": 0,
            "paddingLeft": 0,
            "borderSize": 0,
            "url": "skin/Image_81A5741F_A3EE_D8FD_41BE_74D743C1DCDD.png",
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
                "name": "tittlekomputer"
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
            "id": "AnimatedImageResource_84CA28E9_92AE_1A20_41DF_BA3B321F8E20",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_8_0.png",
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
            "id": "AnimatedImageResource_B8432BF4_93AE_1E21_41E1_76A53B923B82",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_10_0.png",
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
            "id": "AnimatedImageResource_B8431BF4_93AE_1E21_41D9_B37CEA49DAFA",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_11_0.png",
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
            "id": "AnimatedImageResource_B843BBF4_93AE_1E21_41D1_2D3DAD457466",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_12_0.png",
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
            "id": "AnimatedImageResource_B84C2BF4_93AE_1E21_41D8_AEF7F895FB1A",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_13_0.png",
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
            "id": "AnimatedImageResource_B84C0BF4_93AE_1E21_41D2_13C4E1911B12",
            "levels": [
                {
                    "url": "media/panorama_B8DEEBED_B63D_7C5D_41D7_699072C65FF2_0_HS_14_0.png",
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
            "id": "AnimatedImageResource_08B29E38_19AD_5C2B_41A2_34A363FA48B2",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_4_0.png",
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
            "id": "AnimatedImageResource_08B3AE38_19AD_5C2B_41A4_BE782B4CBFCF",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_5_0.png",
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
            "id": "AnimatedImageResource_08B3EE38_19AD_5C2B_41B0_D14FF51DE960",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_6_0.png",
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
            "id": "AnimatedImageResource_08B3DE38_19AD_5C2B_41A3_E923C4326BC6",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_7_0.png",
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
            "id": "AnimatedImageResource_08B37E38_19AD_5C2B_41B4_61BE71D5455D",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_8_0.png",
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
            "id": "AnimatedImageResource_84C988E2_92AE_1A21_41B9_57417E44F5F2",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_9_0.png",
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
            "id": "AnimatedImageResource_84C948E2_92AE_1A21_41DE_09C32E525A38",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_10_0.png",
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
            "id": "AnimatedImageResource_BBF6B34D_A356_BF42_41D9_21C965A7765F",
            "levels": [
                {
                    "url": "media/panorama_B8976067_B63F_4C4D_41D4_82276E08E98E_0_HS_15_0.png",
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
            "id": "AnimatedImageResource_84CCB8E1_92AE_1A23_41C7_83A2BEFF6CBF",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_10_0.png",
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
            "id": "AnimatedImageResource_B844ABEA_93AE_1E20_41D1_7F049FC3D8FA",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_11_0.png",
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
            "id": "AnimatedImageResource_B8457BEB_93AE_1E27_418E_6DB71F114D05",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_12_0.png",
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
            "id": "AnimatedImageResource_B8455BEB_93AE_1E27_41D6_361E1AFD552C",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_13_0.png",
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
            "id": "AnimatedImageResource_9CF9F004_93FB_A29F_41B4_31BBACF640A5",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_14_0.png",
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
            "id": "AnimatedImageResource_B845BBEB_93AE_1E27_41B3_A3C65912C67F",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_15_0.png",
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
            "id": "AnimatedImageResource_907EDC59_87FC_6720_41B1_A97F13807C74",
            "levels": [
                {
                    "url": "media/panorama_BD968780_B63D_74C4_41E2_DED4EB51C2A6_0_HS_8_0.png",
                    "class": "ImageResourceLevel",
                    "width": 800,
                    "height": 1200
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
            "click": "this.showPopupImage(this.ImageResource_AB888B7B_8BE6_63FE_41C4_CC185248B99F, null, '90%', '90%', this.FadeInEffect_AB889B7B_8BE6_63FE_41E0_FBA1ED7D1692, this.FadeOutEffect_AB88EB7B_8BE6_63FE_41DC_81AD65F82DDD, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, false)",
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

