// problems.ts - Collection of coding problems with enhanced structure

export const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\n" +
      "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    hints: [
      "Can you use a hash map to solve this problem?",
      "For each element, check if the target minus the current element exists in the array.",
      "A brute force approach would be O(n²), but there's a more efficient O(n) solution.",
    ],
    starterCode: {
      java: `class Solution {
      public int[] twoSum(int[] nums, int target) {
          // Your code here
          return new int[]{0, 0};
      }
  }`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
      // Your code here
      return {0, 0};
  }`,
      python: `def two_sum(nums, target):
      # Your code here
      return [0, 0]`,
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expectedOutput: "[0, 1]" },
      { input: [[3, 2, 4], 6], expectedOutput: "[1, 2]" },
      { input: [[3, 3], 6], expectedOutput: "[0, 1]" },
    ],
    hiddenTestCases: [
      { input: [[1, 2, 3, 4, 5], 9], expectedOutput: "[3, 4]" },
      { input: [[5, 25, 75], 100], expectedOutput: "[1, 2]" },
      { input: [[-1, -2, -3, -4, -5], -8], expectedOutput: "[2, 4]" },
      { input: [[0, 4, 3, 0], 0], expectedOutput: "[0, 3]" },
    ],
  },
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description:
      "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\n" +
      "A palindrome is a number that reads the same backward as forward.",
    difficulty: "Easy",
    constraints: [
      "-2^31 <= x <= 2^31 - 1",
      "Try to solve it without converting the integer to a string",
    ],
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
      {
        input: "x = -121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
      },
      {
        input: "x = 10",
        output: "false",
        explanation:
          "Reads 01 from right to left. Therefore it is not a palindrome.",
      },
    ],
    hints: [
      "Could negative numbers be palindromes? No, because of the minus sign.",
      "If you're thinking of converting the number to a string, there's another approach.",
      "Try reversing the digits of the number and comparing with the original.",
    ],
    starterCode: {
      java: `class Solution {
      public boolean isPalindrome(int x) {
          // Your code here
          return false;
      }
  }`,
      cpp: `bool isPalindrome(int x) {
      // Your code here
      return false;
  }`,
      python: `def is_palindrome(x):
      # Your code here
      return False`,
    },
    testCases: [
      { input: [121], expectedOutput: "true" },
      { input: [-121], expectedOutput: "false" },
      { input: [10], expectedOutput: "false" },
    ],
    hiddenTestCases: [
      { input: [1221], expectedOutput: "true" },
      { input: [0], expectedOutput: "true" },
      { input: [12321], expectedOutput: "true" },
      { input: [1000021], expectedOutput: "false" },
    ],
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters.\n\n" +
      "You must do this by modifying the input array in-place with O(1) extra memory.",
    difficulty: "Easy",
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character",
      "Do not allocate extra space for another array",
      "You must do this by modifying the input array in-place with O(1) extra memory",
    ],
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: "Reverse the array in-place by swapping characters.",
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        explanation: "Reverse the array in-place by swapping characters.",
      },
    ],
    hints: [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach.",
      "Try using a left pointer and a right pointer and swap elements as you move toward the center.",
    ],
    starterCode: {
      java: `class Solution {
      public void reverseString(char[] s) {
          // Your code here
      }
  }`,
      cpp: `void reverseString(vector<char>& s) {
      // Your code here
  }`,
      python: `def reverse_string(s):
      # Your code here
      pass`,
    },
    testCases: [
      {
        input: [["h", "e", "l", "l", "o"]],
        expectedOutput: '["o","l","l","e","h"]',
      },
      {
        input: [["H", "a", "n", "n", "a", "h"]],
        expectedOutput: '["h","a","n","n","a","H"]',
      },
    ],
    hiddenTestCases: [
      { input: [["a"]], expectedOutput: '["a"]' },
      { input: [["a", "b"]], expectedOutput: '["b","a"]' },
      { input: [["c", "o", "d", "e"]], expectedOutput: '["e","d","o","c"]' },
    ],
  },
  {
    id: "fizz-buzz",
    title: "Fizz Buzz",
    description:
      "Write a function that returns an array of strings for the numbers from 1 to n, where:\n\n" +
      '- For multiples of 3, add "Fizz" instead of the number\n' +
      '- For multiples of 5, add "Buzz" instead of the number\n' +
      '- For multiples of both 3 and 5, add "FizzBuzz" instead of the number\n' +
      "- Otherwise, add the string version of the number",
    difficulty: "Easy",
    constraints: ["1 <= n <= 10^4"],
    examples: [
      {
        input: "n = 3",
        output: '["1","2","Fizz"]',
        explanation: "3 is divisible by 3, so we add 'Fizz' instead of 3.",
      },
      {
        input: "n = 5",
        output: '["1","2","Fizz","4","Buzz"]',
        explanation: "5 is divisible by 5, so we add 'Buzz' instead of 5.",
      },
      {
        input: "n = 15",
        output:
          '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
        explanation:
          "15 is divisible by both 3 and 5, so we add 'FizzBuzz' instead of 15.",
      },
    ],
    hints: [
      "Think about the conditions for each substitution: divisible by 3, divisible by 5, and divisible by both.",
      "Consider the order of your conditionals to handle the 'FizzBuzz' case correctly.",
      "Use the modulo operator (%) to check divisibility.",
    ],
    starterCode: {
      java: `class Solution {
      public List<String> fizzBuzz(int n) {
          // Your code here
          return new ArrayList<>();
      }
  }`,
      cpp: `vector<string> fizzBuzz(int n) {
      // Your code here
      return {};
  }`,
      python: `def fizz_buzz(n):
      # Your code here
      return []`,
    },
    testCases: [
      { input: [3], expectedOutput: '["1","2","Fizz"]' },
      { input: [5], expectedOutput: '["1","2","Fizz","4","Buzz"]' },
      {
        input: [15],
        expectedOutput:
          '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]',
      },
    ],
    hiddenTestCases: [
      { input: [1], expectedOutput: '["1"]' },
      {
        input: [20],
        expectedOutput:
          '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz","16","17","Fizz","19","Buzz"]',
      },
    ],
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    description:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\n" +
      "An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "Easy",
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters",
    ],
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation:
          "Both strings contain the same characters with the same frequencies.",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: "The strings contain different characters.",
      },
    ],
    hints: [
      "What if the inputs contain Unicode characters?",
      "Try using a hash map to count character frequencies.",
      "Sorting both strings is another approach, but it's usually less efficient.",
      "You need to consider both character presence and frequency.",
    ],
    starterCode: {
      java: `class Solution {
      public boolean isAnagram(String s, String t) {
          // Your code here
          return false;
      }
  }`,
      cpp: `bool isAnagram(string s, string t) {
      // Your code here
      return false;
  }`,
      python: `def is_anagram(s, t):
      # Your code here
      return False`,
    },
    testCases: [
      { input: ["anagram", "nagaram"], expectedOutput: "true" },
      { input: ["rat", "car"], expectedOutput: "false" },
    ],
    hiddenTestCases: [
      { input: ["listen", "silent"], expectedOutput: "true" },
      { input: ["hello", "world"], expectedOutput: "false" },
      { input: ["aacc", "ccac"], expectedOutput: "false" },
      { input: ["", ""], expectedOutput: "true" },
    ],
  },
  {
    id: "merge-sorted-arrays",
    title: "Merge Sorted Arrays",
    description:
      "Given two sorted arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array.\n\n" +
      "The number of elements initialized in `nums1` and `nums2` are `m` and `n` respectively. You may assume that `nums1` has a size equal to `m + n` such that it has enough space to hold additional elements from `nums2`.",
    difficulty: "Medium",
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9",
      "Both nums1 and nums2 are sorted in non-decreasing order",
    ],
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation:
          "The arrays we are merging are [1,2,3] and [2,5,6]. The result is [1,2,2,3,5,6].",
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation:
          "The arrays we are merging are [1] and []. The result is [1].",
      },
    ],
    hints: [
      "You can start from either the beginning or the end of the arrays.",
      "Starting from the end allows you to place elements directly into nums1 without using extra space.",
      "Use three pointers: one for the end of nums1's original elements, one for the end of nums2, and one for the current position to fill in nums1.",
    ],
    starterCode: {
      java: `class Solution {
      public void merge(int[] nums1, int m, int[] nums2, int n) {
          // Your code here
      }
  }`,
      cpp: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
      // Your code here
  }`,
      python: `def merge(nums1, m, nums2, n):
      # Your code here
      pass`,
    },
    testCases: [
      {
        input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
        expectedOutput: "[1,2,2,3,5,6]",
      },
      { input: [[1], 1, [], 0], expectedOutput: "[1]" },
      { input: [[0], 0, [1], 1], expectedOutput: "[1]" },
    ],
    hiddenTestCases: [
      {
        input: [[4, 5, 6, 0, 0, 0], 3, [1, 2, 3], 3],
        expectedOutput: "[1,2,3,4,5,6]",
      },
      {
        input: [[1, 2, 3, 0, 0, 0, 0], 3, [2, 5, 6, 7], 4],
        expectedOutput: "[1,2,2,3,5,6,7]",
      },
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    description:
      "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\n" +
      "A subarray is a contiguous part of an array.",
    difficulty: "Medium",
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The array has only one element, so the maximum sum is 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    hints: [
      "Divide and conquer approach can solve this in O(n log n) time.",
      "Kadane's algorithm can solve this in O(n) time.",
      "For each position, you need to decide whether to start a new subarray or extend the existing one.",
      "Keep track of both the current sum and the maximum sum found so far.",
    ],
    starterCode: {
      java: `class Solution {
      public int maxSubArray(int[] nums) {
          // Your code here
          return 0;
      }
  }`,
      cpp: `int maxSubArray(vector<int>& nums) {
      // Your code here
      return 0;
  }`,
      python: `def max_sub_array(nums):
      # Your code here
      return 0`,
    },
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expectedOutput: "6" },
      { input: [[1]], expectedOutput: "1" },
      { input: [[5, 4, -1, 7, 8]], expectedOutput: "23" },
    ],
    hiddenTestCases: [
      { input: [[-1]], expectedOutput: "-1" },
      { input: [[-2, -1]], expectedOutput: "-1" },
      { input: [[-2, 1]], expectedOutput: "1" },
      { input: [[-2, -1, -3, -4, -1, -2, -1, -5, -4]], expectedOutput: "-1" },
    ],
  },
  {
    id: "longest-palindrome",
    title: "Longest Palindromic Substring",
    description:
      "Given a string `s`, return the longest palindromic substring in `s`.\n\n" +
      "A palindrome is a string that reads the same backward as forward.",
    difficulty: "Medium",
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters",
    ],
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.',
      },
      {
        input: 's = "cbbd"',
        output: '"bb"',
        explanation: "The substring 'bb' is a palindrome of length 2.",
      },
    ],
    hints: [
      "Consider expanding around center for each possible center in the string.",
      "There are 2n-1 possible centers (each character and between each adjacent pair).",
      "Dynamic programming is another approach, where dp[i][j] indicates whether s[i:j+1] is a palindrome.",
      "The brute force approach would be O(n³), but more efficient solutions exist.",
    ],
    starterCode: {
      java: `class Solution {
      public String longestPalindrome(String s) {
          // Your code here
          return "";
      }
  }`,
      cpp: `string longestPalindrome(string s) {
      // Your code here
      return "";
  }`,
      python: `def longest_palindrome(s):
      # Your code here
      return ""`,
    },
    testCases: [
      { input: ["babad"], expectedOutput: `"bab"` }, // Note: "aba" is also valid
      { input: ["cbbd"], expectedOutput: `"bb"` },
      { input: ["a"], expectedOutput: `"a"` },
    ],
    hiddenTestCases: [
      { input: ["racecar"], expectedOutput: `"racecar"` },
      { input: ["aacabdkacaa"], expectedOutput: `"aca"` },
      { input: ["abb"], expectedOutput: `"bb"` },
    ],
  },
  {
    id: "binary-tree-inorder",
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.\n\n" +
      "Inorder traversal visits nodes in the order: left child, current node, right child.",
    difficulty: "Medium",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100]",
      "-100 <= Node.val <= 100",
    ],
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation:
          "Inorder traversal of the tree [1,null,2,3] is [1,3,2]. The tree structure is: 1 -> (null, 2 -> (3, null)).",
      },
      {
        input: "root = []",
        output: "[]",
        explanation: "Empty tree has no nodes to traverse.",
      },
      {
        input: "root = [1]",
        output: "[1]",
        explanation:
          "A tree with only one node [1] gives [1] as inorder traversal.",
      },
    ],
    hints: [
      "Recursive solution is straightforward: recursively visit left subtree, current node, then right subtree.",
      "Can you solve it iteratively using a stack?",
      "Morris traversal allows O(1) space complexity without using recursion or a stack.",
      "Think about how to simulate the recursive calls using a stack data structure.",
    ],
    starterCode: {
      java: `/**
   * Definition for a binary tree node.
   * public class TreeNode {
   *     int val;
   *     TreeNode left;
   *     TreeNode right;
   *     TreeNode() {}
   *     TreeNode(int val) { this.val = val; }
   *     TreeNode(int val, TreeNode left, TreeNode right) {
   *         this.val = val;
   *         this.left = left;
   *         this.right = right;
   *     }
   * }
   */
  class Solution {
      public List<Integer> inorderTraversal(TreeNode root) {
          // Your code here
          return new ArrayList<>();
      }
  }`,
      cpp: `/**
   * Definition for a binary tree node.
   * struct TreeNode {
   *     int val;
   *     TreeNode *left;
   *     TreeNode *right;
   *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
   *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
   *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
   * };
   */
  vector<int> inorderTraversal(TreeNode* root) {
      // Your code here
      return {};
  }`,
      python: `# Definition for a binary tree node.
  # class TreeNode:
  #     def __init__(self, val=0, left=None, right=None):
  #         self.val = val
  #         self.left = left
  #         self.right = right
  def inorder_traversal(root):
      # Your code here
      return []`,
    },
    testCases: [
      { input: [[1, null, 2, 3]], expectedOutput: "[1,3,2]" }, // Represents tree: 1->null,2->3
      { input: [[]], expectedOutput: "[]" },
      { input: [[1]], expectedOutput: "[1]" },
    ],
    hiddenTestCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7]], expectedOutput: "[4,2,5,1,6,3,7]" }, // Complete binary tree
      { input: [[1, 2, 3, null, null, 4, 5]], expectedOutput: "[2,1,4,3,5]" },
    ],
  },
];

export default problems;
