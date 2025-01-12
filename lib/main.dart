import 'package:flutter/material.dart';
import 'package:importadora_javierito/view_models/item_view_model.dart';
import 'package:importadora_javierito/view_models/user_view_model.dart';
import 'package:importadora_javierito/views/login_view.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserViewModel()),
        ChangeNotifierProvider(create: (_) => ItemViewModel()),
      ],
      child: MyApp(),
    ),
  );
}
