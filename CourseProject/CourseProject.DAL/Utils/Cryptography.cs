using System;
using System.Security.Cryptography;
using CourseProject.DAL.Abstract;

namespace CourseProject.DAL.Utils
{
    public class Cryptography: ICryptography
    {
        private const int SaltSize = 16, HashSize = 20, HashIter = 10000;
        private static byte[] _salt, _hash;

        public string HashPassword(string password)
        {
            new RNGCryptoServiceProvider().GetBytes(_salt = new byte[SaltSize]);
            var pbkdf2 = new Rfc2898DeriveBytes(password, _salt, HashIter);
            _hash = pbkdf2.GetBytes(HashSize);
            byte[] hashBytes = new byte[HashSize + SaltSize];
            Array.Copy(_salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(_hash, 0, hashBytes, SaltSize, HashSize);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }

        public bool VerifyHashedPassword(string savedPasswordHash, string password)
        {
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
            _salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, _salt, 0, SaltSize);
            var pbkdf2 = new Rfc2898DeriveBytes(password, _salt, HashIter);
            _hash = pbkdf2.GetBytes(HashSize);
            for (int i = 0; i < HashSize; i++)
                if (hashBytes[i + SaltSize] != _hash[i])
                    return false;
            return true;
        }
    }
}