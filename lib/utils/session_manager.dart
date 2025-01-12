class SessionManager {
  static final SessionManager _instance = SessionManager._internal();

  SessionManager._internal();

  factory SessionManager(){
    return _instance;
  }

  String? token;
  int? role;
}

final sessionManager = SessionManager();