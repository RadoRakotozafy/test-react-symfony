<?php

 namespace App\Controller;


 use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
 use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
 use Symfony\Component\HttpFoundation\JsonResponse;
 use Symfony\Component\HttpFoundation\Request;
 use Symfony\Component\HttpFoundation\Response;
 use Symfony\Component\Routing\Annotation\Route;
 use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
 use Symfony\Component\Security\Core\User\UserInterface;

 class AuthController extends ApiController
 {

  public function register(Request $request, UserPasswordEncoderInterface $encoder, UserRepository $userRepository)
  {
   $em = $this->getDoctrine()->getManager();
   $request = $this->transformJsonBody($request);
   $username = $request->get('username');
   $password = $request->get('password');
   $email = $request->get('email');

   if (empty($username) || empty($password) || empty($email)){
    return $this->respondValidationError("Invalid Username or Password or Email");
   }

   $userByUsername = $userRepository->findBy(['username' => $username]);
   $userByEmail = $userRepository->findBy(['email' => $email]);

   if ($userByUsername){
    return $this->respondValidationError("User with this username already exists");
   }

   if ($userByEmail){
    return $this->respondValidationError("User with this email already exists");
   }

   $user = new User($username);
   $user->setPassword($encoder->encodePassword($user, $password));
   $user->setEmail($email);
   $user->setUsername($username);
   $em->persist($user);
   $em->flush();
   return $this->respondWithSuccess(sprintf('User %s successfully created', $user->getUsername()));
  }

  /**
   * @param UserInterface $user
   * @param JWTTokenManagerInterface $JWTManager
   * @return JsonResponse
   */
  public function getTokenUser(UserInterface $user, JWTTokenManagerInterface $JWTManager)
  {
   return new JsonResponse(['token' => $JWTManager->create($user)]);
  }

 }