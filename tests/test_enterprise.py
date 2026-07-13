import unittest
from packages.enterprise.sso_provider import Auth0Provider
from packages.enterprise.rbac import RBACEngine
from packages.enterprise.policy_engine import LocalACLEngine, OPAPolicyEngine

class TestEnterprise(unittest.TestCase):
    
    def test_auth0_sso(self):
        auth0 = Auth0Provider("test.auth0.com", "client123")
        claims = auth0.verify_token("valid_auth0_jwt")
        self.assertEqual(claims["sub"], "user_123")
        
    def test_rbac(self):
        rbac = RBACEngine()
        self.assertTrue(rbac.has_permission(["admin"], "delete"))
        self.assertFalse(rbac.has_permission(["viewer"], "write"))
        
    def test_acl_policy(self):
        acl = LocalACLEngine()
        identity = {"roles": ["contributor"], "tenant_id": "org_1"}
        context = {"id": "doc1", "tenant_id": "org_1"}
        
        # Should allow write for contributor in same tenant
        self.assertTrue(acl.evaluate(identity, context, "write"))
        
        # Should block if wrong tenant
        context["tenant_id"] = "org_2"
        self.assertFalse(acl.evaluate(identity, context, "read"))

    def test_opa_policy(self):
        opa = OPAPolicyEngine()
        identity = {"roles": ["admin"], "sub": "user_1"}
        self.assertTrue(opa.evaluate(identity, {"id": "doc1"}, "delete"))

if __name__ == '__main__':
    unittest.main()
