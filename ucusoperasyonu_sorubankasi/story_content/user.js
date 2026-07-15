window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  if (typeof SCORM_SetScore === 'function') {
    SCORM_SetScore(percentage, 100, 0);
    SCORM_SetStatus(status);
    if (typeof SCORM_CommitData === 'function') SCORM_CommitData();
    console.log("SCORM_SetScore üzerinden başarıyla kaydedildi.");
  } else if (typeof SCORM2004_SetScore === 'function') {
    SCORM2004_SetScore(percentage, 100, 0);
    SCORM2004_SetStatus(status);
    if (typeof SCORM2004_CommitData === 'function') SCORM2004_CommitData();
    console.log("SCORM2004_SetScore üzerinden başarıyla kaydedildi.");
  } else if (typeof lmsAPI !== 'undefined' && typeof lmsAPI.SetScore === 'function') {
    lmsAPI.SetScore(percentage, 100, 0);
    lmsAPI.SetStatus(status);
    if (typeof lmsAPI.CommitData === 'function') {
      lmsAPI.CommitData();
    }
    console.log("lmsAPI.SetScore üzerinden başarıyla kaydedildi.");
  } else {
    // 2. Katman: Alternatif doğrudan SCORM API erişimi (Yerel / iframe dışı)
    var findAPI = function(win) {
      var maxTries = 10;
      var currentWin = win;
      while (currentWin && maxTries > 0) {
        try {
          if (currentWin.API) return currentWin.API;
          if (currentWin.API_1484_11) return currentWin.API_1484_11;
        } catch(e) {}
        if (currentWin.parent && currentWin.parent !== currentWin) currentWin = currentWin.parent;
        else if (currentWin.opener) currentWin = currentWin.opener;
        else break;
        maxTries--;
      }
      return null;
    };
    var api = findAPI(window);
    if (api) {
      if (typeof api.SetValue === 'function') { // SCORM 2004
        api.SetValue("cmi.score.raw", percentage);
        api.SetValue("cmi.score.max", 100);
        api.SetValue("cmi.score.min", 0);
        api.SetValue("cmi.score.scaled", percentage / 100);
        api.SetValue("cmi.completion_status", "completed");
        api.SetValue("cmi.success_status", status);
        api.Commit("");
      } else if (typeof api.LMSSetValue === 'function') { // SCORM 1.2
        api.LMSSetValue("cmi.core.score.raw", percentage);
        api.LMSSetValue("cmi.core.score.max", 100);
        api.LMSSetValue("cmi.core.score.min", 0);
        api.LMSSetValue("cmi.core.lesson_status", status);
        api.LMSCommit("");
      }
      console.log("Doğrudan SCORM API üzerinden başarıyla kaydedildi.");
    } else {
      console.warn("SCORM API bulunamadı, yerel moddasınız.");
    }
  }
} catch (error) {
  console.error("Storyline Moodle/SCORM puan gönderme hatası: ", error);
}
}

};
