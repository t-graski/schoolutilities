// import { Injectable } from '@nestjs/common';
// import {
//   Ability,
//   InferSubjects,
//   AbilityClass,
//   AbilityBuilder,
//   ExtractSubjectType,
// } from '@casl/ability';
// import { Article, User } from 'src/roles/user';
// //import { Action } from 'src/roles/action.enum';

// type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

// export type AppAbility = Ability<[Action, Subjects]>;

// @Injectable()
// export class CaslAbilityFactory {
//   createForUser(user: User) {
//     const { can, cannot, build } = new AbilityBuilder<
//       Ability<[Action, Subjects]>
//     >(Ability as AbilityClass<AppAbility>);

//     if (user.isAdmin) {
//       can(Action.Manage, 'all'); // read-write access to everything
//     } else {
//       can(Action.Read, 'all'); // read-only access to everything
//     }

//     can(Action.Update, Article, { authorId: user.id });
//     cannot(Action.Delete, Article, { isPublished: true });

//     return build({
//       // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
//       detectSubjectType: (item) =>
//         item.constructor as ExtractSubjectType<Subjects>,
//     });
//   }
// }
